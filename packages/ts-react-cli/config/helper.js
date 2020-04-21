const { join } = require('path')

// 创建代理
exports.makeProxy = function (...configs) {
  let ret = {}
  configs.forEach(([prefix, ip]) => ret[prefix] = {
    target: ip, pathRewrite: { [prefix]: '' }
  })
  return ret
}

// 应用的路径
exports.APP_PATH = process.cwd()

// 应用源代码路径
exports.SRC_PATH = join(this.APP_PATH, 'src')

// 应用的公共资源文件夹路径
exports.PUBLIC_PATH = join(this.APP_PATH, 'public')

// 应用打包的路径
exports.BUILD_PATH = join(this.APP_PATH, 'dist')

// 应用自定义配置文件路径
exports.CUSTOM_CONFIG_PATH = join(this.APP_PATH, 'app.config.js')

// 应用package.json文件路径
exports.PACKAGE_FILE_PATH = join(this.APP_PATH, 'package.json')

// 用用通用URL
exports.PUBLIC_URL = '/'

exports.HOST = '0.0.0.0'