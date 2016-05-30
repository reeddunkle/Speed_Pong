module.exports = {
    devtool: "eval-source-map",
    entry: __dirname + "/src/index.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/"
    }
}