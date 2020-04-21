module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.baidu.com',
        changeOrigin: true
      }
    }
  }
}