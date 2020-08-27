const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/mobile/' : '/',
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('common'))
  }
}
