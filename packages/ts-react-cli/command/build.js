'use strict'

process.env.ENV = process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const promiseConfig = require('../config/webpack.config')

async function start() {
  const config = await promiseConfig
  const compiler = webpack(config)
  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toString()

    if (stats.hasErrors()) {
      console.error(info)
    }

    if (stats.hasWarnings()) {
      console.warn(info)
    }
  })
}
start()