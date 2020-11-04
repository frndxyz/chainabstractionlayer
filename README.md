# Chain Abstraction Layer <img align="right" src="https://raw.githubusercontent.com/wagerr/chainabstractionlayer/master/liquality-logo.png" height="80px" />


[![Build Status](https://travis-ci.com/wagerr/chainabstractionlayer.svg?branch=master)](https://travis-ci.com/wagerr/chainabstractionlayer)
[![Coverage Status](https://coveralls.io/repos/github/wagerr/chainabstractionlayer/badge.svg?branch=master)](https://coveralls.io/github/wagerr/chainabstractionlayer?branch=master)
[![Standard Code Style](https://img.shields.io/badge/codestyle-standard-brightgreen.svg)](https://github.com/standard/standard)
[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)
[![Gitter](https://img.shields.io/gitter/room/wagerr/Lobby.svg)](https://gitter.im/wagerr/Lobby?source=orgpage)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/Liquality) [![Greenkeeper badge](https://badges.greenkeeper.io/wagerr/chainabstractionlayer.svg)](https://greenkeeper.io/)

> :warning: This project is under heavy development. Expect bugs & breaking changes.

### :pencil: [Introductory Blog Post: The Missing Tool to Cross-Chain Development](https://medium.com/wagerr/the-missing-tool-to-cross-chain-development-2ebfe898efa1)

Query different blockchains with account management using a single and simple interface.

## Packages

|Package|Version|
|---|---|
|[@wagerr-wdk/wagerr-wagerrjs-lib-swap-provider](./packages/wagerr-wagerrjs-lib-swap-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-wagerrjs-lib-swap-provider.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-wagerrjs-lib-swap-provider)|
|[@wagerr-wdk/wagerr-ledger-provider](./packages/wagerr-ledger-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-ledger-provider.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-ledger-provider)|
|[@wagerr-wdk/wagerr-networks](./packages/wagerr-networks)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-networks.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-networks)|
|[@wagerr-wdk/wagerr-rpc-provider](./packages/wagerr-rpc-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-rpc-provider.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-rpc-provider)|
|[@wagerr-wdk/wagerr-wallet-node-provider](./packages/wagerr-node-wallet-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-node-wallet-provider.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-node-wallet-provider)|
|[@wagerr-wdk/wagerr-swap-provider](./packages/wagerr-swap-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-swap-provider.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-swap-provider)|
|[@wagerr-wdk/wagerr-esplora-api-provider](./packages/wagerr-esplora-api-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-esplora-api-provider.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-esplora-api-provider)|
|[@wagerr-wdk/wagerr-esplora-swap-find-provider](./packages/wagerr-esplora-swap-find-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-esplora-swap-find-provider.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-esplora-swap-find-provider)|
|[@wagerr-wdk/wagerr-utils](./packages/wagerr-utils)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wagerr-utils.svg)](https://npmjs.com/package/@wagerr-wdk/wagerr-utils)|
|[@wagerr-wdk/bundle](./packages/bundle)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/bundle.svg)](https://npmjs.com/package/@wagerr-wdk/bundle)|
|[@wagerr-wdk/client](./packages/client)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/client.svg)](https://npmjs.com/package/@wagerr-wdk/client)|
|[@wagerr-wdk/crypto](./packages/crypto)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/crypto.svg)](https://npmjs.com/package/@wagerr-wdk/crypto)|
|[@wagerr-wdk/debug](./packages/debug)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/debug.svg)](https://npmjs.com/package/@wagerr-wdk/debug)|
|[@wagerr-wdk/errors](./packages/errors)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/errors.svg)](https://npmjs.com/package/@wagerr-wdk/errors)|
|[@wagerr-wdk/ethereum-erc20-provider](./packages/ethereum-erc20-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-erc20-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-erc20-provider)|
|[@wagerr-wdk/ethereum-erc20-swap-provider](./packages/ethereum-erc20-swap-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-erc20-swap-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-erc20-swap-provider)|
|[@wagerr-wdk/ethereum-ledger-provider](./packages/ethereum-ledger-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-ledger-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-ledger-provider)|
|[@wagerr-wdk/ethereum-wallet-api-provider](./packages/ethereum-wallet-api-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-wallet-api-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-wallet-api-provider)|
|[@wagerr-wdk/ethereum-networks](./packages/ethereum-networks)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-networks.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-networks)|
|[@wagerr-wdk/ethereum-rpc-provider](./packages/ethereum-rpc-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-rpc-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-rpc-provider)|
|[@wagerr-wdk/ethereum-swap-provider](./packages/ethereum-swap-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-swap-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-swap-provider)|
|[@wagerr-wdk/ethereum-blockscout-swap-find-provider](./packages/ethereum-blockscout-swap-find-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-blockscout-swap-find-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-blockscout-swap-find-provider)|
|[@wagerr-wdk/ethereum-scraper-swap-find-provider](./packages/ethereum-scraper-swap-find-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-scraper-swap-find-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-scraper-swap-find-provider)|
|[@wagerr-wdk/ethereum-utils](./packages/ethereum-utils)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ethereum-utils.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-utils)|
|[@wagerr-wdk/jsonrpc-provider](./packages/jsonrpc-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/jsonrpc-provider.svg)](https://npmjs.com/package/@wagerr-wdk/jsonrpc-provider)|
|[@wagerr-wdk/ledger-provider](./packages/ledger-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/ledger-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ledger-provider)|
|[@wagerr-wdk/provider](./packages/provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/provider.svg)](https://npmjs.com/package/@wagerr-wdk/provider)|
|[@wagerr-wdk/schema](./packages/schema)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/schema.svg)](https://npmjs.com/package/@wagerr-wdk/schema)|
|[@wagerr-wdk/utils](./packages/utils)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/utils.svg)](https://npmjs.com/package/@wagerr-wdk/utils)|
|[@wagerr-wdk/wallet-provider](./packages/wallet-provider)|[![ChainAbstractionLayer](https://img.shields.io/npm/v/@wagerr-wdk/wallet-provider.svg)](https://npmjs.com/package/@wagerr-wdk/wallet-provider)|


## Usage

```javascript
import Client from '@wagerr-wdk/client'
import WagerrRpcProvider from '@wagerr-wdk/wagerr-rpc-provider'
import EthereumRpcProvider from '@wagerr-wdk/ethereum-rpc-provider'

import WagerrLedgerProvider from '@wagerr-wdk/wagerr-ledger-provider'
import EthereumLedgerProvider from '@wagerr-wdk/ethereum-ledger-provider'

import WagerrNetworks from '@wagerr-wdk/wagerr-networks'
import EthereumNetworks from '@wagerr-wdk/ethereum-networks'

const wagerr = new Client()
const ethereum = new Client()

wagerr.addProvider(new WagerrRpcProvider(
  'https://liquality.io/wagerrtestnetrpc/', 'wagerr', 'local321'
))
ethereum.addProvider(new EthereumRpcProvider(
  'https://rinkeby.infura.io/v3/xxx'
))

wagerr.addProvider(new WagerrLedgerProvider(
  { network: WagerrNetworks.wagerr_testnet }
))
ethereum.addProvider(new EthereumLedgerProvider(
  { network: EthereumNetworks.rinkeby }
))

// Fetch addresses from Ledger wallet using a single-unified API
const [ wagerrAddress ] = await wagerr.wallet.getAddresses(0, 1)
const [ ethereumAddress ] = await ethereum.wallet.getAddresses(0, 1)

// Sign a message
const signedMessageWagerr = await wagerr.wallet.signMessage(
  'The Times 3 January 2009 Chancellor on brink of second bailout for banks', wagerrAddress
)
const signedMessageEthereum = await ethereum.wallet.signMessage(
  'The Times 3 January 2009 Chancellor on brink of second bailout for banks', ethereumAddress
)

// Send a transaction
await wagerr.chain.sendTransaction(<to>, 1000)
await ethereum.chain.sendTransaction(<to>, 1000)
```


## Development

```bash
npm install
npm run bootstrap
npm run watch
```


## Production

```bash
npm run build
```


## Publish

```bash
npm run new:version # prepare
npm run publish:all # publish
```


## License

[MIT](./LICENSE.md)
