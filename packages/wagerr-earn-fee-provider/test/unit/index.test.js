/* eslint-env mocha */

import chai, { expect } from 'chai'
import { mockApi } from './mock'

import Client from '../../../client/lib'
import WagerrEarnFeeProvider from '../../lib'

chai.use(require('chai-bignumber')())
chai.config.truncateThreshold = 0

const MINUTE = 60

describe('Wagerr Earn Fee provider', () => {
  let client

  beforeEach(() => {
    client = new Client()
    client.addProvider(new WagerrEarnFeeProvider())
    mockApi()
  })

  describe('getFees', () => {
    it('Should return correct fees', async () => {
      const fees = await client.chain.getFees()

      expect(fees.slow.fee).to.equal(50)
      expect(fees.slow.wait).to.equal(60 * MINUTE)

      expect(fees.average.fee).to.equal(100)
      expect(fees.average.wait).to.equal(30 * MINUTE)

      expect(fees.fast.fee).to.equal(200)
      expect(fees.fast.wait).to.equal(10 * MINUTE)
    })
  })
})
