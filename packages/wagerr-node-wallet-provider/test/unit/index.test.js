/* eslint-env mocha */

import chai, { expect } from 'chai'

import Client from '../../../client/lib'
import WagerrNetworks from '../../../wagerr-networks/lib'
import WagerrNodeWalletProvider from '../../lib'

const mockJsonRpc = require('../../../../test/mock/mockJsonRpc')
const wagerrRpc = require('../../../../test/mock/wagerr/rpc')

chai.use(require('chai-bignumber')())
chai.config.truncateThreshold = 0

describe('Wagerr RPC provider', () => {
  let client
  let provider

  beforeEach(() => {
    client = new Client()
    provider = new WagerrNodeWalletProvider(WagerrNetworks.wagerr_testnet, 'http://localhost:18443', 'wagerr', 'local321')
    client.addProvider(provider)

    mockJsonRpc('http://localhost:18443', wagerrRpc, 100)
  })

  describe('signMessage', () => {
    it('should return signature', async () => {
      const sig = await provider.signMessage('liquality', 'mfZfUQ4RWLhJdFZr9m2oDXsbcZfuNfYDYi')
      expect(sig).to.equal('205bfd8bb8ccc907e3c5e832eccef1df619d52ea8785045ee9cb7b069e8785e7185d8a8d395666f1c441a7423325c1e4abfd4b9f33e851c60f99f8deb0165e3ef3')
    })
  })
})
