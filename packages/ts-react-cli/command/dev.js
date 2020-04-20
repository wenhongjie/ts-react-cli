'use strict'
process.env.ENV = process.env.NODE_ENV = 'development'

const promiseConfig = require('../config/webpack.config')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

async function start() {
  const config = await promiseConfig
  const serverConfig = config.devServer
  const compiler = webpack(config)
  const devServer = new WebpackDevServer(compiler, serverConfig)
  const { port = 3000, host } = serverConfig
  devServer.listen(port, host)
}
start()





