module.exports = {
    devtool: "eval-source-map",
    entry: __dirname + "/src/index.js",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist/"
    },
    devServer: {
      contentBase: ""
    },
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loader: 'standard',
          exclude: /(node_modules|dist)/,
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /(node_modules|dist)/,
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
}