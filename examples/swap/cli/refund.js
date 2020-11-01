var ChainAbstractionLayer = require('../../../packages/bundle')
const { Client, providers } = ChainAbstractionLayer
const networks = providers.wagerr.networks

var chains = {}
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

chains.wagerr = new Client()
chains.wagerr.addProvider(new providers.wagerr.BitcoreRpcProvider('https://wagerr.liquality.io:443', 'liquality', 'liquality123'))
chains.wagerr.addProvider(new providers.wagerr.WagerrLedgerProvider({ network: networks.wagerr, segwit: false }))
chains.wagerr.addProvider(new providers.wagerr.WagerrSwapProvider({ network: networks.wagerr }))

var initiationTxHash = ''
var recipientAddress = ''
var refundAddress = ''
var secretHash = ''
var expiration = 1468194353
chains.wagerr.swap.refundSwap(initiationTxHash, recipientAddress, refundAddress, secretHash, expiration).then((ret) => {
  console.log('here', ret)
})
