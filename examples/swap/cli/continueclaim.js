var ChainAbstractionLayer = require('../../../packages/bundle')
const { Client, providers } = ChainAbstractionLayer
const networks = providers.wagerr.networks

var chains = {}
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

chains.wagerr = new Client()
chains.wagerr.addProvider(new providers.wagerr.BitcoreRpcProvider('http://localhost:18443', 'wagerr', 'local321'))
chains.wagerr.addProvider(new providers.wagerr.WagerrLedgerProvider({ network: networks.wagerr, segwit: false }))
chains.wagerr.addProvider(new providers.wagerr.WagerrSwapProvider({ network: networks.wagerr }))
function doSwap () {
  console.log('Finding swap transaction')
  var secret = ''
  var secretHash = ''
  var recipientAddress = ''
  var refundAddress = ''
  var expiration = 1468194353
  var value = 10000
  var initTxId = ''
  chains.wagerr.swap.findInitiateSwapTransaction(value, recipientAddress, refundAddress, secretHash, expiration).then(result => {
    console.log('continue')
    if (result._raw.txid === initTxId) {
      console.log('Block has TXID')
      chains.wagerr.swap.verifyInitiateSwapTransaction(initTxId, value, recipientAddress, refundAddress, secretHash, expiration).then(isVerified => {
        if (isVerified) {
          console.log('Transaction Verified on chain!', initTxId)
          var WIF = null
          chains.wagerr.swap.claimSwap(initTxId, recipientAddress, refundAddress, secret, expiration, WIF).then(claimSwapTxId => {
            console.log('Verifying Swap!', claimSwapTxId)
            console.log('Racias', initTxId, secretHash)
            chains.wagerr.swap.findClaimSwapTransaction(initTxId, recipientAddress, refundAddress, secretHash, expiration).then(result => {
              console.log('Done Swap', result)
              doSwap()
            })
          }).catch((error) => {
            console.log('Error here', error)
            doSwap()
          })
        }
      })
    }
  })
}

doSwap()
