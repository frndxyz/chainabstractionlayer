import { BigNumber } from 'bignumber.js'
import bip32 from 'bip32'
import * as wagerr from 'wagerrjs-lib'

import LedgerProvider from '@wagerr-wdk/ledger-provider'
import WagerrWalletProvider from '@wagerr-wdk/wagerr-wallet-provider'
import HwAppBitcoin from '@ledgerhq/hw-app-btc'

import {
  padHexStart
} from '@wagerr-wdk/crypto'
import {
  compressPubKey,
  getAddressNetwork
} from '@wagerr-wdk/wagerr-utils'
import networks from '@wagerr-wdk/wagerr-networks'
import { addressToString } from '@wagerr-wdk/utils'

import { version } from '../package.json'

export default class WagerrLedgerProvider extends WagerrWalletProvider(LedgerProvider) {
  constructor (network = networks.wagerr, addressType = 'bech32') {
    super(network, addressType, [HwAppBitcoin, network, 'WGR'])
    this._walletPublicKeyCache = {}
  }

  async signMessage (message, from) {
    const app = await this.getApp()
    const address = await this.getWalletAddress(from)
    const hex = Buffer.from(message).toString('hex')
    const sig = await app.signMessageNew(address.derivationPath, hex)
    return sig.r + sig.s
  }

  async _buildTransaction (_outputs, feePerByte, fixedInputs) {
    const app = await this.getApp()

    const unusedAddress = await this.getUnusedAddress(true)
    const { inputs, change, fee } = await this.getInputsForAmount(_outputs, feePerByte, fixedInputs)
    const ledgerInputs = await this.getLedgerInputs(inputs)
    const paths = inputs.map(utxo => utxo.derivationPath)

    const outputs = _outputs.map(output => {
      const outputScript = Buffer.isBuffer(output.to) ? output.to : wagerr.address.toOutputScript(output.to, this._network) // Allow for OP_RETURN
      return { amount: this.getAmountBuffer(output.value), script: outputScript }
    })

    if (change) {
      outputs.push({
        amount: this.getAmountBuffer(change.value),
        script: wagerr.address.toOutputScript(addressToString(unusedAddress), this._network)
      })
    }

    const serializedOutputs = app.serializeTransactionOutputs({ outputs }).toString('hex')

    return { hex: await app.createPaymentTransactionNew(
      ledgerInputs,
      paths,
      unusedAddress.derivationPath,
      serializedOutputs,
      undefined,
      undefined,
      ['bech32', 'p2sh-segwit'].includes(this._addressType),
      undefined,
      this._addressType === 'bech32' ? ['bech32'] : undefined
    ),
    fee }
  }

  async signPSBT (data, input, address) {
    const psbt = wagerr.Psbt.fromBase64(data, { network: this._network })
    const app = await this.getApp()
    const walletAddress = await this.getWalletAddress(address)
    const { witnessScript, redeemScript } = psbt.data.inputs[input]
    const { hash: inputHash, index: inputIndex } = psbt.txInputs[input]

    const inputTxHex = await this.getMethod('getRawTransactionByHash')(inputHash.reverse().toString('hex'))
    const outputScript = witnessScript || redeemScript
    const isSegwit = Boolean(witnessScript)

    const ledgerInputTx = await app.splitTransaction(inputTxHex, true)
    
    const ledgerTx = await app.splitTransaction(psbt.__CACHE.__TX.toHex(), true)
    const ledgerOutputs = await app.serializeTransactionOutputs(ledgerTx)

    const signer = {
      network: this._network,
      publicKey: walletAddress.publicKey,
      sign: async () => {
        const ledgerSig = await app.signP2SHTransaction(
          [[ledgerInputTx, inputIndex, outputScript.toString('hex'), 0]],
          [walletAddress.derivationPath],
          ledgerOutputs.toString('hex'),
          psbt.locktime,
          undefined, // SIGHASH_ALL
          isSegwit,
          2
        )
        const finalSig = isSegwit ? ledgerSig[0] : ledgerSig[0] + '01' // Is this a ledger bug? Why non segwit signs need the sighash appended?
        const { signature } = wagerr.script.signature.decode(Buffer.from(finalSig, 'hex'))
        return signature
      }
    }

    await psbt.signInputAsync(input, signer)
    return psbt.toBase64()
  }

  // inputs consists of [{ inputTxHex, index, vout, outputScript }]
  async signBatchP2SHTransaction (inputs, addresses, tx, lockTime = 0, segwit = false) {
    const app = await this.getApp()

    let walletAddressDerivationPaths = []
    for (const address of addresses) {
      const walletAddress = await this.getWalletAddress(address)
      walletAddressDerivationPaths.push(walletAddress.derivationPath)
    }

    if (!segwit) {
      for (const input of inputs) {
        tx.setInputScript(input.vout.n, input.outputScript)
      }
    }

    const ledgerTx = await app.splitTransaction(tx.toHex(), true)
    const ledgerOutputs = (await app.serializeTransactionOutputs(ledgerTx)).toString('hex')

    let ledgerInputs = []
    for (const input of inputs) {
      const ledgerInputTx = await app.splitTransaction(input.inputTxHex, true)
      ledgerInputs.push([ledgerInputTx, input.index, input.outputScript.toString('hex'), 0])
    }

    const ledgerSigs = await app.signP2SHTransaction(
      ledgerInputs,
      walletAddressDerivationPaths,
      ledgerOutputs.toString('hex'),
      lockTime,
      undefined,
      segwit,
      2
    )

    let finalLedgerSigs = []
    for (const ledgerSig of ledgerSigs) {
      const finalSig = segwit ? ledgerSig : ledgerSig + '01'
      finalLedgerSigs.push(Buffer.from(finalSig, 'hex'))
    }

    return finalLedgerSigs
  }

  getAmountBuffer (amount) {
    let hexAmount = BigNumber(Math.round(amount)).toString(16)
    hexAmount = padHexStart(hexAmount, 16)
    const valueBuffer = Buffer.from(hexAmount, 'hex')
    return valueBuffer.reverse()
  }

  async getLedgerInputs (unspentOutputs) {
    const app = await this.getApp()

    return Promise.all(unspentOutputs.map(async utxo => {
      const hex = await this.getMethod('getTransactionHex')(utxo.txid)
      const tx = app.splitTransaction(hex, true)
      return [ tx, utxo.vout, undefined, 0 ]
    }))
  }

  async _getWalletPublicKey (path) {
    const app = await this.getApp()
    const format = this._addressType === 'p2sh-segwit' ? 'p2sh' : this._addressType
    return app.getWalletPublicKey(path, { format: format })
  }

  async getWalletPublicKey (path) {
    if (path in this._walletPublicKeyCache) {
      return this._walletPublicKeyCache[path]
    }

    const walletPublicKey = await this._getWalletPublicKey(path)
    this._walletPublicKeyCache[path] = walletPublicKey
    return walletPublicKey
  }

  async baseDerivationNode () {
    const walletPubKey = await this.getWalletPublicKey(this._baseDerivationPath)
    const compressedPubKey = compressPubKey(walletPubKey.publicKey)
    const node = bip32.fromPublicKey(
      Buffer.from(compressedPubKey, 'hex'),
      Buffer.from(walletPubKey.chainCode, 'hex'),
      this._network
    )
    return node
  }

  async getConnectedNetwork () {
    const walletPubKey = await this.getWalletPublicKey(this._baseDerivationPath)
    const network = getAddressNetwork(walletPubKey.wagerrAddress)
    // Wagerr Ledger app does not distinguish between regtest & testnet
    if (this._network.name === networks.wagerr_regtest.name &&
      network.name === networks.wagerr_testnet.name) {
      return networks.wagerr_regtest
    }
    return network
  }
}

WagerrLedgerProvider.version = version