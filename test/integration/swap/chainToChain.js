/* eslint-env mocha */
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import * as crypto from '../../../packages/crypto/lib'
import { chains, initiateAndVerify, claimAndVerify, getSwapParams, connectMetaMask, fundWallet, importWagerrAddresses, describeExternal } from '../common'
import config from '../config'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

chai.use(chaiAsPromised)

async function testSwap (chain1, chain2) {
  if (process.env.RUN_EXTERNAL) console.log('\x1b[33m', `Generating secret: Watch for prompt`, '\x1b[0m')
  const secret = await chain1.client.swap.generateSecret('test')
  const secretHash = crypto.sha256(secret)

  const chain1SwapParams = await getSwapParams(chain1)
  const chain2SwapParams = await getSwapParams(chain2)

  const chain1InitiationTxId = await initiateAndVerify(chain1, secretHash, chain1SwapParams)
  const chain2InitiationTxId = await initiateAndVerify(chain2, secretHash, chain2SwapParams)
  const claimTx = await claimAndVerify(chain1, chain1InitiationTxId, secret, chain1SwapParams)
  const revealedSecret = claimTx.secret
  expect(revealedSecret).to.equal(secret)
  await claimAndVerify(chain2, chain2InitiationTxId, revealedSecret, chain2SwapParams)
}

describe('Swap Chain to Chain', function () {
  this.timeout(config.timeout)

  describeExternal('Ledger to Node', function () {
    before(async () => {
      await importWagerrAddresses(chains.wagerrWithLedger)
      await fundWallet(chains.wagerrWithLedger)
    })

    it('BTC (Ledger) - BTC (Node)', async () => {
      await testSwap(chains.wagerrWithLedger, chains.wagerrWithNode)
    })

    it('BTC (Node) - BTC (Ledger)', async () => {
      await testSwap(chains.wagerrWithNode, chains.wagerrWithLedger)
    })
  })

  describeExternal('Ledger to MetaMask', function () {
    connectMetaMask()

    before(async () => {
      await importWagerrAddresses(chains.wagerrWithLedger)
      await fundWallet(chains.wagerrWithLedger)
      await fundWallet(chains.ethereumWithMetaMask)
    })

    it('BTC (Ledger) - ETH (MetaMask)', async () => {
      await testSwap(chains.wagerrWithLedger, chains.ethereumWithMetaMask)
    })

    it('ETH (MetaMask) - BTC (Ledger)', async () => {
      await testSwap(chains.ethereumWithMetaMask, chains.wagerrWithLedger)
    })
  })

  describe('Node to Node', function () {
    it('BTC (Node) - ETH (Node)', async () => {
      await testSwap(chains.wagerrWithNode, chains.ethereumWithNode)
    })

    it('ETH (Node) - BTC (Node)', async () => {
      await testSwap(chains.ethereumWithNode, chains.wagerrWithNode)
    })
  })

  describe('JS to JS', function () {
    before(async () => {
      await importWagerrAddresses(chains.wagerrWithJs)
      await fundWallet(chains.wagerrWithJs)
      await fundWallet(chains.ethereumWithJs)
    })

    it('BTC (JS) - ETH (JS)', async () => {
      await testSwap(chains.wagerrWithJs, chains.ethereumWithJs)
    })

    it('ETH (JS) - BTC (JS)', async () => {
      await testSwap(chains.ethereumWithJs, chains.wagerrWithJs)
    })
  })
})
