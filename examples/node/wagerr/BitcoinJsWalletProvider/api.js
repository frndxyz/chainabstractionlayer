const { Client, providers } = require('@wagerr-wdk/bundle')
const config = require('./config')

const wagerrNetworks = providers.wagerr.networks
const wagerrNetwork = wagerrNetworks[config.wagerr.network]

const mneumonic = config.wagerr.mneumonic

exports.getProvider = () => {
  let provider = new Client()

  provider.addProvider(
    new providers.wagerr.WagerrEsploraApiProvider(
      'https://blockstream.info/testnet/api'
    )
  )
  provider.addProvider(
    new providers.wagerr.WagerrJsWalletProvider(
      wagerrNetwork,
      config.wagerr.rpc.host,
      config.wagerr.rpc.username,
      config.wagerr.rpc.password,
      mneumonic,
      'legacy'
    )
  )
  return provider
}
