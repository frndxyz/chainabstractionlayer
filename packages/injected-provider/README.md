# `@wagerr-wdk/injected-provider` <img align="right" src="https://raw.githubusercontent.com/wagerr/chainabstractionlayer/master/liquality-logo.png" height="80px" />


[![Build Status](https://travis-ci.com/wagerr/chainabstractionlayer.svg?branch=master)](https://travis-ci.com/wagerr/chainabstractionlayer)
[![Coverage Status](https://coveralls.io/repos/github/wagerr/chainabstractionlayer/badge.svg?branch=master)](https://coveralls.io/github/wagerr/chainabstractionlayer?branch=master)
[![Standard Code Style](https://img.shields.io/badge/codestyle-standard-brightgreen.svg)](https://github.com/standard/standard)
[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](../../LICENSE.md)
[![@wagerr-wdk/injected-provider](https://img.shields.io/npm/dt/@wagerr-wdk/injected-provider.svg)](https://npmjs.com/package/@wagerr-wdk/injected-provider)
[![Gitter](https://img.shields.io/gitter/room/wagerr/Lobby.svg)](https://gitter.im/wagerr/Lobby?source=orgpage)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/Liquality) [![Greenkeeper badge](https://badges.greenkeeper.io/wagerr/chainabstractionlayer.svg)](https://greenkeeper.io/)

> :warning: This project is under heavy development. Expect bugs & breaking changes.

### :pencil: [Introductory Blog Post: The Missing Tool to Cross-Chain Development](https://medium.com/wagerr/the-missing-tool-to-cross-chain-development-2ebfe898efa1)


Query different blockchains with account management using a single and simple interface.


## Installation

```bash
npm i @wagerr-wdk/injected-provider
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/@wagerr-wdk/injected-provider@0.2.3/dist/injected-provider.min.js"></script>
<!-- sourceMap at https://cdn.jsdelivr.net/npm/@wagerr-wdk/injected-provider@0.2.3/dist/injected-provider.min.js.map -->
<!-- available as window.InjectedProvider -->
```


## Usage

```js
import Client from '@wagerr-wdk/client'

import InjectedProvider from '@wagerr-wdk/injected-provider'

const wagerr = new Client()
const ethereum = new Client()

wagerr.addProvider(new InjectedProvider(window.providerManager.getProviderFor('WGR')))
ethereum.addProvider(new InjectedProvider(window.providerManager.getProviderFor('ETH')))

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
