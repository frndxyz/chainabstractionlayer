# `@wagerr-wdk/jsonrpc-provider` <img align="right" src="https://raw.githubusercontent.com/wagerr/chainabstractionlayer/master/liquality-logo.png" height="80px" />


[![Build Status](https://travis-ci.com/wagerr/chainabstractionlayer.svg?branch=master)](https://travis-ci.com/wagerr/chainabstractionlayer)
[![Coverage Status](https://coveralls.io/repos/github/wagerr/chainabstractionlayer/badge.svg?branch=master)](https://coveralls.io/github/wagerr/chainabstractionlayer?branch=master)
[![Standard Code Style](https://img.shields.io/badge/codestyle-standard-brightgreen.svg)](https://github.com/standard/standard)
[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](../../LICENSE.md)
[![@wagerr-wdk/jsonrpc-provider](https://img.shields.io/npm/dt/@wagerr-wdk/jsonrpc-provider.svg)](https://npmjs.com/package/@wagerr-wdk/jsonrpc-provider)
[![Gitter](https://img.shields.io/gitter/room/wagerr/Lobby.svg)](https://gitter.im/wagerr/Lobby?source=orgpage)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/Liquality) [![Greenkeeper badge](https://badges.greenkeeper.io/wagerr/chainabstractionlayer.svg)](https://greenkeeper.io/)

> :warning: This project is under heavy development. Expect bugs & breaking changes.

### :pencil: [Introductory Blog Post: The Missing Tool to Cross-Chain Development](https://medium.com/wagerr/the-missing-tool-to-cross-chain-development-2ebfe898efa1)


Query different blockchains with account management using a single and simple interface.


## Installation

```bash
npm i @wagerr-wdk/jsonrpc-provider
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/@wagerr-wdk/jsonrpc-provider@0.2.3/dist/jsonrpc-provider.min.js"></script>
<!-- sourceMap at https://cdn.jsdelivr.net/npm/@wagerr-wdk/jsonrpc-provider@0.2.3/dist/jsonrpc-provider.min.js.map -->
<!-- available as window.JsonRpcProvider -->
```


## Usage

```js
import JsonRpcProvider from '@wagerr-wdk/jsonrpc-provider'

const jsonrpc = new JsonRpcProvider('https://jsonrpc.com', 'username', 'password')

await jsonrpc.jsonrpc('sendtoaddress', 'xxx')
```


## License

[MIT](../../LICENSE.md)
