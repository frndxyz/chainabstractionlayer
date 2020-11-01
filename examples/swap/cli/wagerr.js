process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const { Client, providers, crypto } = require('../../../packages/bundle')
const networks = providers.wagerr.networks
const chains = {}

chains.wagerr = new Client()
chains.wagerr.addProvider(new providers.wagerr.WagerrBitcoreRpcProvider('http://localhost:18443', 'wagerr', 'local321'))
// chains.wagerr.addProvider(new providers.wagerr.WagerrLedgerProvider({ network: networks.wagerr_testnet, segwit: false }))
// chains.wagerr.addProvider(new providers.wagerr.WagerrSwapProvider({ network: networks.wagerr_testnet }))
chains.wagerr.addProvider(new providers.wagerr.WagerrNodeWalletProvider(networks.wagerr_testnet, 'http://localhost:18443', 'wagerr', 'local321'))
chains.wagerr.addProvider(new providers.wagerr.WagerrSwapProvider({ network: networks.wagerr_testnet }))
async function doSwap () {
  chains.wagerr.swap.generateSecret('test').then(secret => {
    chains.wagerr.wallet.getUnusedAddress().then(address => {
      const secretHash = crypto.sha256(secret)
      const recipientAddress = address.address
      const refundAddress = address.address
      const expiration = 1468194353
      const value = 10000

      console.log('Secret Hash:', secretHash)
      console.log('Recipient Address:', recipientAddress)
      console.log('Refund Address:', refundAddress)
      console.log('Expirey:', expiration)
      console.log('Value:', value)
      chains.wagerr.swap.createSwapScript(recipientAddress, refundAddress, secretHash, expiration).then(result => {
        console.log('Create Swap:', result)
      })

      chains.wagerr.swap.initiateSwap(value, recipientAddress, refundAddress, secretHash, expiration).then(initTxId => { // init
        console.log('Initiate Swap', initTxId)
        console.log('Finding swap transaction')
        // chains.wagerr.getMethod('generateBlock')(1).then((txid) => {console.log("Mining Block", txid)})
        chains.wagerr.swap.findInitiateSwapTransaction(value, recipientAddress, refundAddress, secretHash, expiration).then(result => { // find
          if (result._raw.txid === initTxId) { // TODO, check for more than one TX!
            console.log('Block has TXID') //
            chains.wagerr.swap.verifyInitiateSwapTransaction(initTxId, value, recipientAddress, refundAddress, secretHash, expiration).then(isVerified => { // verify
              if (isVerified) {
                console.log('Transaction Verified on chain!', initTxId)
                // chains.wagerr.getMethod('dumpPrivKey')(recipientAddress).then((WIF) => {
                const WIF = null
                //  console.log("WIF", WIF)
                chains.wagerr.swap.claimSwap(initTxId, recipientAddress, refundAddress, secret, expiration, WIF).then(claimSwapTxId => {
                  console.log('Verifying Swap!', claimSwapTxId)
                  // chains.wagerr.getMethod('generateBlock')(1).then((txid) => {console.log("Mining Block", txid)})
                  console.log('Racias', initTxId, secretHash)
                  chains.wagerr.swap.findClaimSwapTransaction(initTxId, recipientAddress, refundAddress, secretHash, expiration).then(result => {
                    console.log('Done Swap', result)
                    doSwap()
                  })
                }).catch((error) => {
                  console.log('Error here', error)
                  doSwap()
                })
              // })
              }
            })
          }
        })
      })
    })
  })
}

doSwap()
