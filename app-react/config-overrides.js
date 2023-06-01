const { name } = require('./package.json')

module.exports = {
  webpack: (config, env) => {
    config.output.library = `${name}-[name]`
    config.output.libraryTarget = 'umd'
    return config
  },
  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      }
      return config
    }
  },
}
