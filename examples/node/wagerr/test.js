process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const { Client, providers } = require('../../../packages/bundle')
const { WagerrLedgerProvider, WagerrBitcoreRpcProvider, networks } = providers.wagerr

console.log(networks)

const wagerr = new Client()
wagerr.addProvider(new WagerrBitcoreRpcProvider('https://btc-testnet.leep.it', 'wagerr', 'local321'))
wagerr.addProvider(new WagerrLedgerProvider({ network: networks.wagerr_testnet, segwit: false }))

function time (ref = false) {
  if (ref) {
    const s = (Date.now() - ref) / 1000
    console.log(`Time: ${s}s`)
    return
  }

  return Date.now()
}

let x

;(async () => {
  try {
    x = time()
    console.log((await wagerr.getMethod('getUnusedAddress')(false, 100)).address)
    time(x)
    x = time()
    console.log(await wagerr.getMethod('getUtxosForAmount')(1e8 / 1000, 100))
    time(x)
    x = time()
    const usedAddresses = await wagerr.getMethod('getUsedAddresses')(100)
    time(x)
    console.log(usedAddresses.map(x => x.address))
    x = time()
    console.log(await wagerr.getMethod('getBalance')(usedAddresses.map(a => a.address)))
    time(x)
  } catch (e) {
    console.log(e)
  }
})()
