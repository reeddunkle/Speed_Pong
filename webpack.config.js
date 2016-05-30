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
      loaders: [
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_module|dist)/,
        query: {
          presets: ['es2015']
        }
      ]
    }
}