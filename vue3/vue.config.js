module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/production/' :
    '/',
  outputDir: process.env.outputDir,
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
  }
}