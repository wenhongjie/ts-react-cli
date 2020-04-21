const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const webpack = require('webpack')
const { PUBLIC_URL, APP_PATH, CUSTOM_CONFIG_PATH, PUBLIC_PATH, PACKAGE_FILE_PATH, SRC_PATH } = require('./helper')
const webpackMerge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const packageJSON = require(PACKAGE_FILE_PATH)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

// 当前进程的工作目录
const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'

// 通用配置
const config = {
  mode: NODE_ENV,

  entry: [
    'react-hot-loader/patch',
    path.join(SRC_PATH, 'main.tsx')
  ],

  output: {
    // TODO 在 webpack5版本 移除
    futureEmitAssets: true,
    publicPath: PUBLIC_URL
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(bmp|gif|jpe?g|png)$/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 2048,
              name: 'assets/images/[name].[hash:8].[ext]',
            }
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: require.resolve('url-loader'),
            options: {
              name: 'assets/fonts/[name]_[hash:2].[ext]'
            }
          },
          {
            test: /\.(tsx?|jsx?)$/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [
                '@babel/preset-typescript',
                '@babel/preset-react'
              ],
              // 这是webpack的“ babel-loader”功能（不是Babel本身）。 
              // 可以在./node_modules/.cache/babel-loader/
              // 目录中缓存结果，以加快重建速度。
              cacheDirectory: true,
              cacheCompression: false,
              compact: isProd ? true : false,
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'css'
                  }
                ],
                'react-hot-loader/babel'
              ]
            },
            include: SRC_PATH
          },
          {
            test: /\.scss$/,
            use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: {
                    mode: (path) => {
                      if (/\.global\.scss$/i.test(path)) {
                        return 'global'
                      }
                      return 'local'
                    },
                    localIdentName: '[name].[hash:base64:5]'
                  }
                }
              },
              'sass-loader'
            ]
          },
          {
            test: /\.css$/,
            use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: {
                    mode: (path) => {
                      if (/\.global\.css$/i.test(path)) {
                        return 'global'
                      }
                      return 'local'
                    },
                    localIdentName: '[name].[hash:base64:5]'
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJSON.VERSION),
      ENV: JSON.stringify(NODE_ENV),
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(PUBLIC_PATH, 'index.html'),
      hash: isDev ? false : true
    })
  ],

  resolve: {
    alias: {
      '@': SRC_PATH
    },
    extensions: ['.tsx', '.ts', '.js']
  },

  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 800,
  //   poll: 10
  // }
}

// 开发配置
const devOrProdConfig = isProd ? prodConfig : isDev && devConfig

// 自定义配置
const customConfig = fs.existsSync(CUSTOM_CONFIG_PATH) ? require(CUSTOM_CONFIG_PATH) : {}

module.exports = devOrProdConfig instanceof Promise ?
  devOrProdConfig.then(conf => webpackMerge(
    config, conf, customConfig
  )) :
  Promise.resolve(webpackMerge(
    config, devOrProdConfig, customConfig
  ))
