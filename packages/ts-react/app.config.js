const path = require('path')

module.exports = {
  entry: {
    main: path.resolve('./src/main.tsx')
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.baidu.com',
        changeOrigin: true
      }
    }
  }
}