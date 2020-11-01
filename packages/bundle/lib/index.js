import Client from '@wagerr-wdk/client'
import Provider from '@wagerr-wdk/provider'
import JsonRpcProvider from '@wagerr-wdk/jsonrpc-provider'
import LedgerProvider from '@wagerr-wdk/ledger-provider'
import Debug from '@wagerr-wdk/debug'

import * as crypto from '@wagerr-wdk/crypto'
import * as schema from '@wagerr-wdk/schema'
import * as errors from '@wagerr-wdk/errors'
import * as utils from '@wagerr-wdk/utils'

import * as providers from './providers'

import { version } from '../package.json'

export {
  Client,
  Provider,
  JsonRpcProvider,
  LedgerProvider,
  Debug,

  crypto,
  schema,
  errors,
  utils,

  providers,

  version
}
