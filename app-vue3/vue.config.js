const { name } = require('./package')

module.exports = {
  devServer: {
    port: 9913,
    headers: {
      'Access-Control-Allow-Origin': '*', //开发时增加跨域 表示所有人都可以访问我的服务器
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
}
