import WagerrEsploraBatchApiProvider from '@wagerr-wdk/wagerr-esplora-batch-api-provider'
import WagerrJsWalletProvider from '@wagerr-wdk/wagerr-js-wallet-provider'
import WagerrSwapProvider from '@wagerr-wdk/wagerr-swap-provider'
import WagerrEsploraSwapFindProvider from '@wagerr-wdk/wagerr-esplora-swap-find-provider'
import WagerrRpcFeeProvider from '@wagerr-wdk/wagerr-rpc-fee-provider'
import WagerrNetworks from '@wagerr-wdk/wagerr-networks'

export default [
    {
        provider: WagerrEsploraBatchApiProvider,
        optional: ['numberOfBlockConfirmation', 'defaultFeePerByte'],
        args: config => [
            'https://explorer2.wagerr.com/api',
            'https://explorer2.wagerr.com/api',
            WagerrNetworks.wagerr_testnet,
            config.numberOfBlockConfirmation === undefined ? 1 : config.numberOfBlockConfirmation,
            config.defaultFeePerByte === undefined ? 3 : config.defaultFeePerByte
        ]
    },
    {
        provider: WagerrJsWalletProvider,
        onlyIf: ['mnemonic'],
        args: config => [
            WagerrNetworks.wagerr_testnet,
            config.mnemonic
        ]
    },
    {
        provider: WagerrSwapProvider,
        args: [
            WagerrNetworks.wagerr_testnet
        ]
    },
    {
        provider: WagerrEsploraSwapFindProvider,
        args: [
            'https://liquality.io/electrs'
        ]
    },
    {
        provider: WagerrRpcFeeProvider
    }
]