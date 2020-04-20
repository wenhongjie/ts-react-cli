const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const getPort = require('get-port');
const { HOST } = require('./helper')
const { v4 } = require('internal-ip')
const IP_V4 = v4.sync()
const { PACKAGE_FILE_PATH } = require('./helper')
const packageJSON = require(PACKAGE_FILE_PATH)
require('colors')

module.exports = getPort({port: getPort.makeRange(3000, 3100)}).then(port => ({
  mode: 'development',

  output: {
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js'
  },

  devServer: {
    compress: true,
    overlay: true,
    clientLogLevel: 'none',
    watchContentBase: true,
    hot: true,
    // quiet: true,
    port,
    host: HOST,
    stats: {
      all: false,
      colors: true,
      errors: true
    },
    historyApiFallback: true
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          '应用运行在: ' + `http://localhost:${port}`.underline.blue,
          '对外地址为: ' + (HOST === '0.0.0.0' ? `http://${IP_V4}:${port}` : `${HOST}:${port}`).blue.underline
        ],
        notes: ['当前应用版本: ' + packageJSON.version.cyan]
      },
    })
  ]
}))