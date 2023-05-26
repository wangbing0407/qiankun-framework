const { name } = require('./package')

module.exports = {
  devServer: {
    port: 9912,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => ({ name: '/fonts/[name].[hash:8].[ext]' }))
      .end()
  },
  configureWebpack: {
    output: {
      library: `${name}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
}
