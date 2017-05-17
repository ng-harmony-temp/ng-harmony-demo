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
        }, {
            test: /\.(sass|scss)$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader", // compiles Sass to CSS
                options: {
                    includePaths: ["/node_modules/inuitcss"]
                }
            }]
        }]
    }
};
