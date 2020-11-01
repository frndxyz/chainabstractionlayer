const { Client, providers } = require('../../../packages/bundle')
const { WagerrLedgerProvider } = providers.wagerr

const wagerr = new Client()
wagerr.addProvider(new WagerrLedgerProvider())

;(async () => {
  try {
    const [ address ] = await wagerr.wallet.getAddresses(0, 1)
    console.log(address)
    console.log(await wagerr.wallet.signMessage('hello world', address.address))
  } catch (e) {
    console.log(e)
  }
})()
