import * as wagerrjs from '@wagerr-wdk/wagerrjs-lib'
import { version } from '../package.json'

export default { //TODO: wagerr network type
  wagerr: {
    name: 'wagerr',
    ...wagerrjs.networks.wagerr,
    coinType: '0',
    isTestnet: false
  },
  wagerr_testnet: {
    name: 'wagerr_testnet',
    ...wagerrjs.networks.testnet,
    coinType: '1',
    isTestnet: true
  },
  wagerr_regtest: {
    name: 'wagerr_regtest',
    ...wagerrjs.networks.regtest,
    coinType: '1',
    isTestnet: true
  },

  version
}
