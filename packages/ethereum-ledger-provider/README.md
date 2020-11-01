# `@wagerr-wdk/ethereum-ledger-provider` <img align="right" src="https://raw.githubusercontent.com/wagerr/chainabstractionlayer/master/liquality-logo.png" height="80px" />


[![Build Status](https://travis-ci.com/wagerr/chainabstractionlayer.svg?branch=master)](https://travis-ci.com/wagerr/chainabstractionlayer)
[![Coverage Status](https://coveralls.io/repos/github/wagerr/chainabstractionlayer/badge.svg?branch=master)](https://coveralls.io/github/wagerr/chainabstractionlayer?branch=master)
[![Standard Code Style](https://img.shields.io/badge/codestyle-standard-brightgreen.svg)](https://github.com/standard/standard)
[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](../../LICENSE.md)
[![@wagerr-wdk/ethereum-ledger-provider](https://img.shields.io/npm/dt/@wagerr-wdk/ethereum-ledger-provider.svg)](https://npmjs.com/package/@wagerr-wdk/ethereum-ledger-provider)
[![Gitter](https://img.shields.io/gitter/room/wagerr/Lobby.svg)](https://gitter.im/wagerr/Lobby?source=orgpage)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/Liquality) [![Greenkeeper badge](https://badges.greenkeeper.io/wagerr/chainabstractionlayer.svg)](https://greenkeeper.io/)

> :warning: This project is under heavy development. Expect bugs & breaking changes.

### :pencil: [Introductory Blog Post: The Missing Tool to Cross-Chain Development](https://medium.com/wagerr/the-missing-tool-to-cross-chain-development-2ebfe898efa1)


Query different blockchains with account management using a single and simple interface.


## Installation

```bash
npm i @wagerr-wdk/ethereum-ledger-provider
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/@wagerr-wdk/ethereum-ledger-provider@0.2.3/dist/ethereum-ledger-provider.min.js"></script>
<!-- sourceMap at https://cdn.jsdelivr.net/npm/@wagerr-wdk/ethereum-ledger-provider@0.2.3/dist/ethereum-ledger-provider.min.js.map -->
<!-- available as window.EthereumLedgerProvider -->
```


## Usage

```js
import EthereumLedgerProvider from '@wagerr-wdk/ethereum-ledger-provider'
import EthereumNetworks from '@wagerr-wdk/ethereum-network'

const ledger = new EthereumLedgerProvider({
  network: EthereumNetworks.rinkeby
})

await ledger.getAddresses(0, 1)
```


## License

[MIT](../../LICENSE.md)
