'use strict'

process.env.ENV = process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const config = require('../config/webpack.config')