const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BUILD_PATH } = require('./helper')

module.exports = {
  // Stop compilation early in production
  bail: true,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: false,
    }
  },

  output: {
    path: BUILD_PATH,
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    new CleanWebpackPlugin()
  ],

  stats: {
    all: false,
    colors: true,
    errors: true
  }
}