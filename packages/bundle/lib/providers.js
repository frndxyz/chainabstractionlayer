import WagerrLedgerProvider from '@wagerr-wdk/wagerr-ledger-provider'
import WagerrRpcProvider from '@wagerr-wdk/wagerr-rpc-provider'
import WagerrRpcFeeProvider from '@wagerr-wdk/wagerr-rpc-fee-provider'
import WagerrEarnFeeProvider from '@wagerr-wdk/wagerr-earn-fee-provider'
import WagerrNodeWalletProvider from '@wagerr-wdk/wagerr-node-wallet-provider'
import WagerrJsWalletProvider from '@wagerr-wdk/wagerr-js-wallet-provider'
import WagerrKibaProvider from '@wagerr-wdk/wagerr-kiba-provider'
import WagerrSwapProvider from '@wagerr-wdk/wagerr-swap-provider'
import WagerrEsploraApiProvider from '@wagerr-wdk/wagerr-esplora-api-provider'
import WagerrEsploraSwapFindProvider from '@wagerr-wdk/wagerr-esplora-swap-find-provider'
import * as WagerrNetworks from '@wagerr-wdk/wagerr-networks'
import * as WagerrUtils from '@wagerr-wdk/wagerr-utils'

import EthereumErc20Provider from '@wagerr-wdk/ethereum-erc20-provider'
import EthereumErc20SwapProvider from '@wagerr-wdk/ethereum-erc20-swap-provider'
import EthereumLedgerProvider from '@wagerr-wdk/ethereum-ledger-provider'
import EthereumWalletApiProvider from '@wagerr-wdk/ethereum-wallet-api-provider'
import EthereumJsWalletProvider from '@wagerr-wdk/ethereum-js-wallet-provider'
import EthereumRpcProvider from '@wagerr-wdk/ethereum-rpc-provider'
import EthereumRpcFeeProvider from '@wagerr-wdk/ethereum-rpc-fee-provider'
import EthereumGasStationFeeProvider from '@wagerr-wdk/ethereum-gas-station-fee-provider'
import EthereumSwapProvider from '@wagerr-wdk/ethereum-swap-provider'
import EthereumBlockscoutSwapFindProvider from '@wagerr-wdk/ethereum-blockscout-swap-find-provider'
import EthereumScraperSwapFindProvider from '@wagerr-wdk/ethereum-scraper-swap-find-provider'
import EthereumErc20ScraperSwapFindProvider from '@wagerr-wdk/ethereum-erc20-scraper-swap-find-provider'
import * as EthereumNetworks from '@wagerr-wdk/ethereum-networks'
import * as EthereumUtils from '@wagerr-wdk/ethereum-utils'

const wagerr = {
  WagerrLedgerProvider,
  WagerrRpcProvider,
  WagerrRpcFeeProvider,
  WagerrEarnFeeProvider,
  WagerrNodeWalletProvider,
  WagerrJsWalletProvider,
  WagerrKibaProvider,
  WagerrSwapProvider,
  WagerrEsploraApiProvider,
  WagerrEsploraSwapFindProvider,
  WagerrNetworks,
  WagerrUtils,
  networks: WagerrNetworks
}

const ethereum = {
  EthereumErc20Provider,
  EthereumErc20SwapProvider,
  EthereumLedgerProvider,
  EthereumWalletApiProvider,
  EthereumJsWalletProvider,
  EthereumRpcProvider,
  EthereumRpcFeeProvider,
  EthereumGasStationFeeProvider,
  EthereumSwapProvider,
  EthereumBlockscoutSwapFindProvider,
  EthereumScraperSwapFindProvider,
  EthereumErc20ScraperSwapFindProvider,
  EthereumNetworks,
  EthereumUtils,
  networks: EthereumNetworks
}

export {
  wagerr,
  ethereum
}
