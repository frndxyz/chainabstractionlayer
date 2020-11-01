process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const { Client, providers } = require('../../../packages/bundle')
const { WagerrLedgerProvider, BitcoreRpcProvider, networks } = providers.wagerr

const wagerr = new Client()
wagerr.addProvider(new BitcoreRpcProvider('http://localhost:18443', 'wagerr', 'local321'))
wagerr.addProvider(new WagerrLedgerProvider({ network: networks.wagerr_testnet, segwit: false }))
// wagerr.addProvider(new BitcoreRpcProvider('https://wagerr.liquality.io/', 'liquality', 'liquality123'))

;(async () => {
  try {
    let d = Date.now()
    try {
      console.log(await wagerr.getMethod('getUnusedAddress')())
      console.log('Time taken', `${(Date.now() - d) / 1000}s`)
    } catch (e) {
      console.error(e)
    }
  } catch (e) {
    console.log(e)
  }
})()
