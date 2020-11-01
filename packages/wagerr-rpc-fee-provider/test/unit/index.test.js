/* eslint-env mocha */

import chai, { expect } from 'chai'

import Client from '../../../client/lib'
import WagerrRpcProvider from '../../../wagerr-rpc-provider/lib'
import WagerrRpcFeeProvider from '../../lib'

const mockJsonRpc = require('../../../../test/mock/mockJsonRpc')
const wagerrRpc = require('../../../../test/mock/wagerr/rpc')

chai.use(require('chai-bignumber')())
chai.config.truncateThreshold = 0

const MINUTE = 60

describe('Wagerr RPC Fee provider', () => {
  let client

  beforeEach(() => {
    client = new Client()
    client.addProvider(new WagerrRpcProvider('http://localhost:18443'))
    client.addProvider(new WagerrRpcFeeProvider(6, 3, 1))

    mockJsonRpc('http://localhost:18443', wagerrRpc, 100)
  })

  describe('getFees', () => {
    it('Should return correct fees', async () => {
      const fees = await client.chain.getFees()

      expect(fees.slow.fee).to.equal(5)
      expect(fees.slow.wait).to.equal(60 * MINUTE)

      expect(fees.average.fee).to.equal(10)
      expect(fees.average.wait).to.equal(30 * MINUTE)

      expect(fees.fast.fee).to.equal(20)
      expect(fees.fast.wait).to.equal(10 * MINUTE)
    })
  })
})
