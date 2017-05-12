var path = require("path");

module.exports = {
    entry: "./client/src/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["env", "flow", "stage-0"],
                    plugins: ["babel-plugin-syntax-class-properties", "babel-plugin-transform-decorators-legacy"]
                }
            }
        }]
    }
};
