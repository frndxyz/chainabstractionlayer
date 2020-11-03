import WagerrWalletProvider from '@wagerr-wdk/wagerr-wallet-provider'
import WalletProvider from '@wagerr-wdk/wallet-provider'
import * as wagerr from '@wagerr-wdk/wagerrjs-lib'
import * as wagerrMessage from '@wagerr-wdk/wagerrjs-message'
import { addressToString } from '@wagerr-wdk/utils'
import { mnemonicToSeed } from 'bip39'
import bip32 from 'bip32'

import { version } from '../package.json'

export default class WagerrJsWalletProvider extends WagerrWalletProvider(WalletProvider) {
  constructor (network, mnemonic, addressType = 'legacy') {
    super(network, addressType, [network])
    if (!mnemonic) throw new Error('Mnemonic should not be empty')
    this._mnemonic = mnemonic
  }

  async seedNode () {
    if (this._seedNode) return this._seedNode
    const seed = await mnemonicToSeed(this._mnemonic)
    this._seedNode = bip32.fromSeed(seed, this._network)
    return this._seedNode
  }

  async baseDerivationNode () {
    if (this._baseDerivationNode) return this._baseDerivationNode
    const baseNode = await this.seedNode()
    this._baseDerivationNode = baseNode.derivePath(this._baseDerivationPath)
    return this._baseDerivationNode
  }

  async keyPair (derivationPath) {
    const node = await this.seedNode()
    const wif = node.derivePath(derivationPath).toWIF()
    return wagerr.ECPair.fromWIF(wif, this._network)
  }

  async signMessage (message, from) {
    const address = await this.getWalletAddress(from)
    const keyPair = await this.keyPair(address.derivationPath)
    const signature = wagerrMessage.sign(message, keyPair.privateKey, keyPair.compressed)
    return signature.toString('hex')
  }

  async _buildTransaction (outputs, feePerByte, fixedInputs) {
    const network = this._network

    const unusedAddress = await this.getUnusedAddress(true)
    const { inputs, change, fee } = await this.getInputsForAmount(outputs, feePerByte, fixedInputs)

    if (change) {
      outputs.push({
        to: unusedAddress,
        value: change.value
      })
    }

    const txb = new wagerr.TransactionBuilder(network)

    for (const output of outputs) {
      const to = output.to.address === undefined ? output.to : addressToString(output.to) // Allow for OP_RETURN
      txb.addOutput(to, output.value)
    }

    const prevOutScriptType = this.getScriptType()

    for (let i = 0; i < inputs.length; i++) {
      const wallet = await this.getWalletAddress(inputs[i].address)
      const keyPair = await this.keyPair(wallet.derivationPath)
      const paymentVariant = this.getPaymentVariantFromPublicKey(keyPair.publicKey)

      txb.addInput(inputs[i].txid, inputs[i].vout, 0, paymentVariant.output)
    }

    for (let i = 0; i < inputs.length; i++) {
      const wallet = await this.getWalletAddress(inputs[i].address)
      const keyPair = await this.keyPair(wallet.derivationPath)
      const paymentVariant = this.getPaymentVariantFromPublicKey(keyPair.publicKey)
      const needsWitness = this._addressType === 'bech32' || this._addressType === 'p2sh-segwit'

      const signParams = { prevOutScriptType, vin: i, keyPair }

      if (needsWitness) {
        signParams.witnessValue = inputs[i].value
      }

      if (this._addressType === 'p2sh-segwit') {
        signParams.redeemScript = paymentVariant.redeem.output
      }

      txb.sign(signParams)
    }

    return { hex: txb.build().toHex(), fee }
  }

  async _buildSweepTransaction (externalChangeAddress, feePerByte, _outputs = [], fixedInputs) {
    let _feePerByte = feePerByte || false
    if (_feePerByte === false) _feePerByte = await this.getMethod('getFeePerByte')()

    const { inputs, outputs, change } = await this.getInputsForSweep(_outputs, _feePerByte, fixedInputs)

    if (change) {
      throw Error('There should not be any change for sweeping transaction')
    }

    _outputs.forEach((output, i) => {
      const spliceIndex = outputs.findIndex((sweepOutput) => output.value === sweepOutput.value)
      outputs.splice(spliceIndex, spliceIndex + 1)
    })

    _outputs.push({
      to: externalChangeAddress,
      value: outputs[0].value
    })

    return this._buildTransaction(_outputs, feePerByte, inputs)
  }

  async signP2SHTransaction (inputTxHex, tx, address, prevout, outputScript, lockTime = 0, segwit = false) {
    const wallet = await this.getWalletAddress(address)
    const keyPair = await this.keyPair(wallet.derivationPath)

    let sigHash

    if (segwit) {
      sigHash = tx.hashForWitnessV0(0, outputScript, prevout.vSat, wagerr.Transaction.SIGHASH_ALL) // AMOUNT NEEDS TO BE PREVOUT AMOUNT
    } else {
      sigHash = tx.hashForSignature(0, outputScript, wagerr.Transaction.SIGHASH_ALL)
    }

    const sig = wagerr.script.signature.encode(keyPair.sign(sigHash), wagerr.Transaction.SIGHASH_ALL)
    return sig
  }

  // inputs consists of [{ inputTxHex, index, vout, outputScript }]
  async signBatchP2SHTransaction (inputs, addresses, tx, lockTime = 0, segwit = false) {
    let keyPairs = []
    for (const address of addresses) {
      const wallet = await this.getWalletAddress(address)
      const keyPair = await this.keyPair(wallet.derivationPath)
      keyPairs.push(keyPair)
    }

    let sigs = []
    for (let i = 0; i < inputs.length; i++) {
      const index = inputs[i].txInputIndex ? inputs[i].txInputIndex : inputs[i].index
      let sigHash
      if (segwit) {
        sigHash = tx.hashForWitnessV0(index, inputs[i].outputScript, inputs[i].vout.vSat, wagerr.Transaction.SIGHASH_ALL) // AMOUNT NEEDS TO BE PREVOUT AMOUNT
      } else {
        sigHash = tx.hashForSignature(index, inputs[i].outputScript, wagerr.Transaction.SIGHASH_ALL)
      }

      const sig = wagerr.script.signature.encode(keyPairs[i].sign(sigHash), wagerr.Transaction.SIGHASH_ALL)
      sigs.push(sig)
    }

    return sigs
  }

  getScriptType () {
    if (this._addressType === 'legacy') return 'p2pkh'
    else if (this._addressType === 'p2sh-segwit') return 'p2sh-p2wpkh'
    else if (this._addressType === 'bech32') return 'p2wpkh'
  }

  async getConnectedNetwork () {
    return this._network
  }

  async isWalletAvailable () {
    return true
  }
}

WagerrJsWalletProvider.version = version
