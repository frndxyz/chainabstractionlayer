# `@wagerr-wdk/client` <img align="right" src="https://raw.githubusercontent.com/wagerr/chainabstractionlayer/master/liquality-logo.png" height="80px" />


[![Build Status](https://travis-ci.com/wagerr/chainabstractionlayer.svg?branch=master)](https://travis-ci.com/wagerr/chainabstractionlayer)
[![Coverage Status](https://coveralls.io/repos/github/wagerr/chainabstractionlayer/badge.svg?branch=master)](https://coveralls.io/github/wagerr/chainabstractionlayer?branch=master)
[![Standard Code Style](https://img.shields.io/badge/codestyle-standard-brightgreen.svg)](https://github.com/standard/standard)
[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](../../LICENSE.md)
[![@wagerr-wdk/client](https://img.shields.io/npm/dt/@wagerr-wdk/client.svg)](https://npmjs.com/package/@wagerr-wdk/client)
[![Gitter](https://img.shields.io/gitter/room/wagerr/Lobby.svg)](https://gitter.im/wagerr/Lobby?source=orgpage)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/Liquality) [![Greenkeeper badge](https://badges.greenkeeper.io/wagerr/chainabstractionlayer.svg)](https://greenkeeper.io/)

> :warning: This project is under heavy development. Expect bugs & breaking changes.

### :pencil: [Introductory Blog Post: The Missing Tool to Cross-Chain Development](https://medium.com/wagerr/the-missing-tool-to-cross-chain-development-2ebfe898efa1)


Query different blockchains with account management using a single and simple interface.


## Installation

```bash
npm i @wagerr-wdk/client
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/@wagerr-wdk/client@0.2.3/dist/client.min.js"></script>
<!-- sourceMap at https://cdn.jsdelivr.net/npm/@wagerr-wdk/client@0.2.3/dist/client.min.js.map -->
<!-- available as window.Client -->
```


## Usage

```js
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
  'The Times 3 January 2009 Chancellor on brink of second bailout for banks', wagerrAddress.address
)
const signedMessageEthereum = await ethereum.wallet.signMessage(
  'The Times 3 January 2009 Chancellor on brink of second bailout for banks', ethereumAddress.address
)

// Send a transaction
await wagerr.chain.sendTransaction(<to>, 1000)
await ethereum.chain.sendTransaction(<to>, 1000)
```


## License

[MIT](../../LICENSE.md)
