import WagerrEsploraBatchApiProvider from '@wagerr-wdk/wagerr-esplora-batch-api-provider'
import WagerrJsWalletProvider from '@wagerr-wdk/wagerr-js-wallet-provider'
import WagerrSwapProvider from '@wagerr-wdk/wagerr-swap-provider'
import WagerrEsploraSwapFindProvider from '@wagerr-wdk/wagerr-esplora-swap-find-provider'
import WagerrEarnFeeProvider from '@wagerr-wdk/wagerr-earn-fee-provider'
import WagerrNetworks from '@wagerr-wdk/wagerr-networks'

export default [
  {
    provider: WagerrEsploraBatchApiProvider,
    optional: ['numberOfBlockConfirmation', 'defaultFeePerByte'],
    args: config => [
      'https://explorer.wagerr.com/api',
      'https://explorer.wagerr.com/api',
      WagerrNetworks.wagerr,
      config.numberOfBlockConfirmation === undefined ? 1 : config.numberOfBlockConfirmation,
      config.defaultFeePerByte === undefined ? 3 : config.defaultFeePerByte
    ]
  },
  {
    provider: WagerrJsWalletProvider,
    onlyIf: ['mnemonic'],
    args: config => [
      WagerrNetworks.wagerr,
      config.mnemonic
    ]
  },
  {
    provider: WagerrSwapProvider,
    args: [
      WagerrNetworks.wagerr
    ]
  },
  {
    provider: WagerrEsploraSwapFindProvider,
    args: [
      'https://wagerr.io/electrs'
    ]
  },
  {
    provider: WagerrEarnFeeProvider
  }
]
