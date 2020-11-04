import EthereumRpcProvider from '@wagerr-wdk/ethereum-rpc-provider'
import EthereumJsWalletProvider from '@wagerr-wdk/ethereum-js-wallet-provider'
import EthereumSwapProvider from '@wagerr-wdk/ethereum-swap-provider'
import EthereumScraperSwapFindProvider from '@wagerr-wdk/ethereum-scraper-swap-find-provider'
import EthereumGasStationFeeProvider from '@wagerr-wdk/ethereum-gas-station-fee-provider'
import EthereumNetworks from '@wagerr-wdk/ethereum-networks'

export default [
  {
    provider: EthereumRpcProvider,
    optional: ['infuraProjectId'],
    args: config => [
      `https://mainnet.infura.io/v3/${config.infuraProjectId || '1d8f7fb6ae924886bbd1733951332eb0'}`
    ]
  },
  {
    provider: EthereumJsWalletProvider,
    onlyIf: ['mnemonic'],
    args: config => [
      EthereumNetworks.mainnet,
      config.mnemonic
    ]
  },
  {
    provider: EthereumSwapProvider
  },
  {
    provider: EthereumScraperSwapFindProvider,
    args: [
      'https://liquality.io/eth-mainnet-api'
    ]
  },
  {
    provider: EthereumGasStationFeeProvider
  }
]
