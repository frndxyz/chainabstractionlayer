import WalletProvider from '@wagerr-wdk/wallet-provider'
import JsonRpcProvider from '@wagerr-wdk/jsonrpc-provider'
import WagerrNetworks from '@wagerr-wdk/wagerr-networks'
import { AddressTypes } from '@wagerr-wdk/wagerr-utils'
import * as wagerr from '@wagerr-wdk/wagerrjs-lib'
import { sha256 } from '@wagerr-wdk/crypto'
import { Address, addressToString } from '@wagerr-wdk/utils'
import _ from 'lodash'

import { version } from '../package.json'

const BIP70_CHAIN_TO_NETWORK = {
  'main': WagerrNetworks.wagerr,
  'test': WagerrNetworks.wagerr_testnet,
  'regtest': WagerrNetworks.wagerr_regtest
}

export default class WagerrNodeWalletProvider extends WalletProvider { // TODO: wagerr json rpc
  constructor (network, uri, username, password, addressType = 'bech32') {
    super()
    if (!AddressTypes.includes(addressType)) {
      throw new Error(`addressType must be one of ${AddressTypes.join(',')}`)
    }
    this._addressType = addressType
    this._network = network
    this._rpc = new JsonRpcProvider(uri, username, password)
  }

  async signMessage (message, from) {
    from = addressToString(from)
    return this._rpc.jsonrpc('signmessage', from, message).then(result => Buffer.from(result, 'base64').toString('hex'))
  }

  async signPSBT (psbtHex, address) {
    const psbt = wagerr.Psbt.fromHex(psbtHex, { network: this._network })
    const wif = await this.dumpPrivKey(address)
    const keyPair = wagerr.ECPair.fromWIF(wif, this._network)

    psbt.signInput(0, keyPair) // TODO: SIGN ALL OUTPUTS
    return psbt.toHex()
  }

  // inputs consists of [{ inputTxHex, index, vout, outputScript }]
  async signBatchP2SHTransaction (inputs, addresses, tx, lockTime = 0, segwit = false) {
    let wallets = []
    for (const address of addresses) {
      const wif = await this.dumpPrivKey(address)
      const wallet = wagerr.ECPair.fromWIF(wif, this._network)
      wallets.push(wallet)
    }

    let sigs = []
    for (let i = 0; i < inputs.length; i++) {
      let sigHash
      if (segwit) {
        sigHash = tx.hashForWitnessV0(inputs[i].index, inputs[i].outputScript, inputs[i].vout.vSat, wagerr.Transaction.SIGHASH_ALL) // AMOUNT NEEDS TO BE PREVOUT AMOUNT
      } else {
        sigHash = tx.hashForSignature(inputs[i].index, inputs[i].outputScript, wagerr.Transaction.SIGHASH_ALL)
      }

      const sig = wagerr.script.signature.encode(wallets[i].sign(sigHash), wagerr.Transaction.SIGHASH_ALL)
      sigs.push(sig)
    }

    return sigs
  }

  async dumpPrivKey (address) {
    address = addressToString(address)
    return this._rpc.jsonrpc('dumpprivkey', address)
  }

  async getNewAddress (addressType, label = '') {
    const params = addressType ? [label, addressType] : [label]
    const newAddress = await this._rpc.jsonrpc('getnewaddress', ...params)

    if (!newAddress) return null

    return new Address(newAddress)
  }

  async getAddresses () {
    return this.getUsedAddresses()
  }

  async getUnusedAddress () {
    return this.getNewAddress(this._addressType)
  }

  async getUsedAddresses () {
    const usedAddresses = await this._rpc.jsonrpc('listaddressgroupings')
    const emptyAddresses = await this._rpc.jsonrpc('listreceivedbyaddress', 0, true)

    const addrs = [
      ..._.flatten(usedAddresses).map(addr => addr[0]),
      ...emptyAddresses.map(a => a.address)
    ]

    return _.uniq(addrs).map(addr => new Address({ address: addr }))
  }

  async getWalletAddress (address) {
    const wif = await this.dumpPrivKey(address)
    const wallet = wagerr.ECPair.fromWIF(wif, this._network)
    return new Address(address, null, wallet.publicKey, null)
  }

  async isWalletAvailable () {
    const newAddress = await this.getNewAddress()
    return !!newAddress
  }

  async getConnectedNetwork () {
    const blockchainInfo = await this._rpc.jsonrpc('getblockchaininfo')
    const chain = blockchainInfo.chain
    return BIP70_CHAIN_TO_NETWORK[chain]
  }

  async generateSecret (message) {
    const secretAddressLabel = 'secretAddress'
    let address
    try {
      const labelAddresses = await this._rpc.jsonrpc('getaddressesbylabel', secretAddressLabel)
      address = Object.keys(labelAddresses)[0]
    } catch (e) { // Label does not exist
      address = await this.getNewAddress('legacy', secretAddressLabel) // Signing only possible with legacy addresses
    }
    const signedMessage = await this.signMessage(message, address)
    const secret = sha256(signedMessage)
    return secret
  }
}

WagerrNodeWalletProvider.version = version
