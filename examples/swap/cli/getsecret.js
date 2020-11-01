var ChainAbstractionLayer = require('../../../packages/bundle')
const { Client, providers, crypto } = ChainAbstractionLayer
const networks = providers.wagerr.networks

var chains = {}
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

chains.wagerr = new Client()
chains.wagerr.addProvider(new providers.wagerr.BitcoreRpcProvider('https://wagerr.liquality.io:443', 'liquality', 'liquality123'))
chains.wagerr.addProvider(new providers.wagerr.WagerrLedgerProvider({ network: networks.wagerr, segwit: false }))
chains.wagerr.addProvider(new providers.wagerr.WagerrSwapProvider({ network: networks.wagerr }))

function doSwap () {
  chains.wagerr.swap.generateSecret('test').then(secret => {
    chains.wagerr.wallet.getUnusedAddress().then(address => {
      var secretHash = crypto.sha256(secret)
      console.log(secret)
      console.log(secretHash)
    })
  })
}

doSwap()
