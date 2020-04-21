const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portFinder = require('portfinder')
const { HOST, PUBLIC_URL } = require('./helper')
const { v4 } = require('internal-ip')
const WebpackProgressBar = require('webpack-progress-bar')
const { PACKAGE_FILE_PATH, PUBLIC_PATH } = require('./helper')
const packageJSON = require(PACKAGE_FILE_PATH)
const webpack = require('webpack')
const IP_V4 = v4.sync()
require('colors')

module.exports = portFinder.getPortPromise({
  port: 3000,
  stopPort: 9999
}).then(port => ({
  mode: 'development',

  devtool: 'cheap-module-source-map',

  output: {
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js'
  },

  devServer: {
    compress: true,
    overlay: true,
    // hotOnly: true,
    clientLogLevel: 'none',
    watchContentBase: true, // 如果指定的contentBase目录中的文件发生改变则刷新整个页面
    contentBase: PUBLIC_PATH, // 指定静态内容的目录
    contentBasePublicPath: PUBLIC_URL,
    publicPath: PUBLIC_URL.slice(0, -1),
    hot: true,
    inline: true,
    port,
    host: HOST,
    stats: {
      all: false,
      colors: true,
      errors: true
    },
    historyApiFallback: {
      disableDotRule: true,
      index: PUBLIC_URL,
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new WebpackProgressBar({
      complete: {
        bg: 'cyan'
      }
    }),
    
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