const path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('./src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist')
  },
  devServer: {
    contentBase: ''
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /(node_modules|dist)/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules|dist)/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
}
