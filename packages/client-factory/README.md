# `@wagerr-sdk/client-factory` <img align="right" src="https://raw.githubusercontent.com/wagerr-sdk/chainabstractionlayer/master/wagerr-sdk-logo.png" height="80px" />


 [![Build Status](https://travis-ci.com/wagerr-sdk/chainabstractionlayer.svg?branch=master)](https://travis-ci.com/wagerr-sdk/chainabstractionlayer)
 [![Coverage Status](https://coveralls.io/repos/github/wagerr-sdk/chainabstractionlayer/badge.svg?branch=master)](https://coveralls.io/github/wagerr-sdk/chainabstractionlayer?branch=master)
 [![Standard Code Style](https://img.shields.io/badge/codestyle-standard-brightgreen.svg)](https://github.com/standard/standard)
 [![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](../../LICENSE.md)
 [![@wagerr-sdk/client-factory](https://img.shields.io/npm/dt/@wagerr-sdk/client-factory.svg)](https://npmjs.com/package/@wagerr-sdk/client-factory)
 [![Gitter](https://img.shields.io/gitter/room/wagerr-sdk/Lobby.svg)](https://gitter.im/wagerr-sdk/Lobby?source=orgpage)
 [![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/Liquality) [![Greenkeeper badge](https://badges.greenkeeper.io/wagerr-sdk/chainabstractionlayer.svg)](https://greenkeeper.io/)

 > :warning: This project is under heavy development. Expect bugs & breaking changes.

 ### :pencil: [Introductory Blog Post: The Missing Tool to Cross-Chain Development](https://medium.com/wagerr-sdk/the-missing-tool-to-cross-chain-development-2ebfe898efa1)


 Query different blockchains with account management using a single and simple interface.


 ## Installation

 ```bash
 npm i @wagerr-sdk/client-factory
 ```

 or

 ```html
 <script src="https://cdn.jsdelivr.net/npm/@wagerr-sdk/client-factory@0.2.3/dist/client.min.js"></script>
 <!-- sourceMap at https://cdn.jsdelivr.net/npm/@wagerr-sdk/client-factory@0.2.3/dist/client.min.js.map -->
 <!-- available as window.Client -->
 ```


 ## Usage

 ```js
 import ClientFactory from '@wagerr-sdk/client-factory'

 const wagerr = ClientFactory.create('mainnet', 'btc', { mnemonic: 'xxx' })
 const ethereum = ClientFactory.create('mainnet', 'eth', { mnemonic: 'xxx' })

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