process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const { Client, providers } = require('../../../packages/bundle')
const { WagerrLedgerProvider, BitcoreRpcProvider, networks } = providers.wagerr

const wagerr = new Client()
wagerr.addProvider(new BitcoreRpcProvider('http://localhost:18443', 'wagerr', 'local321'))
wagerr.addProvider(new WagerrLedgerProvider({ network: networks.wagerr_testnet, segwit: false }))

;(async () => {
  try {
    // console.log(address)
    let d = Date.now()
    try {
      const addresses = await wagerr.swap.getAddresses(0, 50)
      console.log(addresses)
      /*
      var xpubkeys = await wagerr.getAddressExtendedPubKeys("49'/1'/0'")
      console.log(xpubkeys[0])
      var bjs = require("@wagerr-wdk/wagerrjs-lib")
      var node = bjs.HDNode.fromBase58(xpubkeys[0], bjs.networks.testnet);
      for ( var i = 0; i < 30; i++ ) {
        console.log(node.derivePath("0/" + i).getAddress());
      }
      */

      console.log('Time taken', `${(Date.now() - d) / 1000}s`)
    } catch (e) {
      console.error(e)
    }
  } catch (e) {
    console.log(e)
  }
})()
