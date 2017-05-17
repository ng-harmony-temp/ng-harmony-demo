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
            exclude: /node_modules\/(?!ng-harmony.*\/).*/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["env", "es2017", "flow", "stage-0"],
                    plugins: [
                        "transform-decorators-legacy",
                        "transform-class-properties"
                    ]
                }
            }
        },
        {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }]
        }]
    }
};
