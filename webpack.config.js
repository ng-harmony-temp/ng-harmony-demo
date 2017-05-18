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
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
                "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
            ]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: "file-loader?name=dist/fonts/[name].[ext]"
        }]
    }
};
