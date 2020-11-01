const { Client, providers } = require('../../../packages/bundle')
const { WagerrRpcProvider } = providers.wagerr

const wagerr = new Client()
wagerr.addProvider(new WagerrRpcProvider('http://localhost:18443', 'wagerr', 'local321'))

;(async () => {
  console.log(await wagerr.chain.generateBlock(1))
})()
