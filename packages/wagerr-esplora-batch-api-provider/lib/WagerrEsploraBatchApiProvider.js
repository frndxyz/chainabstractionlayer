import axios from 'axios'
import WagerrEsploraApiProvider from '@wagerr-wdk/wagerr-esplora-api-provider'
import { uniq } from 'lodash'
import BigNumber from 'bignumber.js'

import { addressToString } from '@wagerr-wdk/utils'

import { version } from '../package.json'

export default class WagerrEsploraBatchApiProvider extends WagerrEsploraApiProvider {
  constructor (batchUrl, url, network, numberOfBlockConfirmation = 1, defaultFeePerByte = 3) {
    super(url, network, numberOfBlockConfirmation, defaultFeePerByte)

    this.batchUrl = batchUrl

    this._batchAxios = axios.create({
      baseURL: batchUrl,
      responseType: 'text',
      transformResponse: undefined // https://github.com/axios/axios/issues/907,
    })
  }

  async getUnspentTransactions (addresses) {
    addresses = uniq(addresses.map(addressToString))
    const addressesJoin = addresses.join(',')
    const response = await this._batchAxios.get(`/custom/getunspenttransactions/${addressesJoin}`)
    return response.data.map(utxo => ({
      txid: utxo.txId,
      vout: utxo.n,
      blockHeight: utxo.blockHeight,
      address: addressToString(utxo.address),
      satoshis: utxo.satoshi,
      amount: BigNumber(utxo.satoshi).dividedBy(1e8).toNumber()
    }))
  }

  async getAddressTransactionCounts (addresses) {
    addresses = uniq(addresses.map(addressToString))
    const addressesJoin = addresses.join(',')
    const response = await this._batchAxios.get(`/custom/getaddressesinfo/${addressesJoin}`)

    const transactionCountsArray = Object.keys(response.data).map((addr) => {
      return { [addr]: response.data[addr].tx_counts }
    })

    const transactionCounts = Object.assign({}, ...transactionCountsArray)
    return transactionCounts
  }
}

WagerrEsploraBatchApiProvider.version = version
