var path = require("path");

var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === "test" || ENV === "test-watch";
var isProd = ENV === "build";

let config = {
    entry: isTest ? void 0 : ["babel-polyfill", "./client/src/app.js"],
    output: {
        filename: isProd
            ? "[name].[hash].js"
            : "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        chunkFilename: isProd
            ? "[name].[hash].js"
            : "[name].bundle.js"
    },
    devtool: isProd
        ? "source-map"
        : (isTest
            ? "inline-source-map"
            : "eval-source-map"),
    devServer: {
        contentBase: "./client",
        stats: "minimal"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!ng-harmony.*\/).*/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "es2017", "stage-0"
                        ],
                        plugins: [
                            "transform-async-functions",
                            "transform-decorators-legacy",
                            "transform-class-properties"
                        ]
                    }
                }
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            }, {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {
                            includePaths: ["/node_modules/inuitcss"]
                        }
                    }
                ]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=[hash].[ext]", {
                        "loader": "image-webpack-loader",
                        "query": {
                            "mozjpeg": {
                                "progressive": true
                            },
                            "gifsicle": {
                                "interlaced": false
                            },
                            "optipng": {
                                "optimizationLevel": 4
                            },
                            "pngquant": {
                                "quality": "75-90",
                                "speed": 3
                            }
                        }
                    }
                ]
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: "file-loader?name=fonts/[name].[ext]"
            }
        ]
    },
    resolve: {
        mainFields: ["browser", "module", "main"]
    },
    externals: {
        fs: "{}"
    },
    cache: false
};

if (isTest) {
    config.module.rules.push({
        enforce: "pre",
        test: /\.js$/,
        exclude: [
            /node_modules/, /\.spec\.js$/
        ],
        loader: "istanbul-instrumenter-loader",
        query: {
            esModules: true
        }
    });
}

config.plugins = [];

if (!isTest) {
    config.plugins.push(new HtmlWebpackPlugin({ template: "./client/index.html", inject: "body" }), new ExtractTextPlugin({
        "filename": "css/[name].css",
        disable: !isProd,
        allChunks: true
    }));
}

if (isProd) {
    config.plugins.push(new CopyWebpackPlugin([
        {
            from: __dirname + "/client"
        }
    ]))
}

module.exports = config;
