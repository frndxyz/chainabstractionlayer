import axios from 'axios'
import Provider from '@wagerr-wdk/provider'
import { isArray } from 'lodash'
import { decodeRawTransaction, normalizeTransactionObject } from '@wagerr-wdk/wagerr-utils'
import BigNumber from 'bignumber.js'

import { addressToString } from '@wagerr-wdk/utils'

import { version } from '../package.json'

export default class WagerrEsploraApiProvider extends Provider {
  constructor (url, network, numberOfBlockConfirmation = 1, defaultFeePerByte = 3) {
    super()
    this.url = url
    this._network = network
    this._numberOfBlockConfirmation = numberOfBlockConfirmation
    this._defaultFeePerByte = defaultFeePerByte

    this._axios = axios.create({
      baseURL: url,
      responseType: 'text',
      transformResponse: undefined // https://github.com/axios/axios/issues/907,
    })
  }

  async getFeePerByte (numberOfBlocks = this._numberOfBlockConfirmation) {
    try {
      const feeEstimates = (await this._axios(`/getfeeinfo?blocks=${numberOfBlocks}`)).data
      const rate = Math.round((feeEstimates * Math.pow(10, 8)) / 1000)
      return rate
    } catch (e) {
      return this._defaultFeePerByte
    }
  }

  async getMinRelayFee () {
    return 1
  }

  async isAddressUsed (address) {
    const amountReceived = await this.getReceivedByAddress(address)

    return amountReceived > 0
  }

  async getBalance (addresses) {
    if (!isArray(addresses)) {
      addresses = [addresses]
    }

    const utxos = await this.getUnspentTransactions(addresses)
    return utxos
      .reduce((acc, utxo) => acc.plus(utxo.satoshis), new BigNumber(0))
  }

  async _getUnspentTransactions (addresses) {
    const response = await this._axios.get(`/custom/getunspenttransactions/${addresses}`)
    return response.data.map(utxo => ({
      txid: utxo.txId,
      vout: utxo.n,
      blockHeight: utxo.blockHeight,
      address: addressToString(utxo.address),
      satoshis: utxo.satoshi,
      amount: BigNumber(utxo.satoshi).dividedBy(1e8).toNumber()
    }))
  }

  async getUnspentTransactions (addresses) {
    const addressesStrArray = addresses.map((addr) => {
      return addressToString(addr)
    })
    const addressesJoin = addressesStrArray.join(',')
    const utxos = await this._getUnspentTransactions(addressesJoin)
    return utxos
  }

  async _getAddressesTransactionCount (addresses) {
    const response = await this._axios.get(`/custom/getaddressesinfo/${addresses}`)
    return response.data
  }

  async getAddressTransactionCounts (addresses) {
    const addressesStrArray = addresses.map((addr) => {
      return addressToString(addr)
    })
    const addressesJoin = addressesStrArray.join(',')
    const response = await this._getAddressesTransactionCount(addressesJoin)
    const transactionCountsArray = Object.keys(response).map((addr) => {
      return { [addr]: response[addr].tx_counts }
    })

    const transactionCounts = Object.assign({}, ...transactionCountsArray)
    return transactionCounts
  }

  async getTransactionHex (transactionHash) {
    const response = await this._axios.get(`/getrawtransaction?txid=${transactionHash}`)
    return response.data
  }

  async getTransaction (transactionHash) {
    const response = await this._axios.get(`/gettransaction?hash=${transactionHash}`)
    const currentHeight = await this.getBlockHeight()
    return this.formatTransaction(response.data, currentHeight)
  }

  async formatTransaction (tx, currentHeight) {
    const hex = await this.getTransactionHex(tx.txid)
    const confirmations = (currentHeight - tx.blockHeight) + 1
    const decodedTx = decodeRawTransaction(hex, this._network)
    decodedTx.confirmations = confirmations
    return normalizeTransactionObject(decodedTx, /* tx.fee */ 0.00014, { hash: tx.blockHash, number: tx.blockHeight })
  }

  async getBlockByHash (blockHash) {
    const response = await this._axios.get(`/getblockbyhash?hash=${blockHash}`)
    const data = response.data
    const {
      id: hash,
      height: number,
      timestamp,
      // difficulty,
      size,
      previousblockhash: parentHash,
      nonce
    } = data

    return {
      hash,
      number,
      timestamp,
      size,
      parentHash,
      nonce
    }
  }

  async getBlockHash (blockNumber) {
    const response = await this._axios.get(`/getblockhash?index=${blockNumber}`)
    return response.data
  }

  async getBlockByNumber (blockNumber) {
    return this.getBlockByHash(await this.getBlockHash(blockNumber))
  }

  async getBlockHeight () {
    const response = await this._axios.get('/getblockcount')
    return parseInt(response.data)
  }

  async getTransactionByHash (transactionHash) {
    return this.getRawTransactionByHash(transactionHash, true)
  }

  async getRawTransactionByHash (transactionHash, decode = false) {
    return decode ? this.getTransaction(transactionHash) : this.getTransactionHex(transactionHash)
  }

  async sendRawTransaction (rawTransaction) {
    const response = await this._axios.post('/sendrawtransaction', { hexstring: rawTransaction })
    return response.data
  }
}

WagerrEsploraApiProvider.version = version
