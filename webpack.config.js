const path = require('path')
const HWP = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve("css-loader"),
                        options: {
                            modules: false,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: require.resolve("postcss-loader"),
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                require("postcss-flexbugs-fixes"),
                                autoprefixer({
                                    browsers: [
                                        ">1%",
                                        "last 4 versions",
                                        "Firefox ESR",
                                        "ios >= 8",
                                        "not ie < 9"
                                    ],
                                    flexbox: "no-2009"
                                })
                            ]
                        }
                    },
                    {
                        loader: require.resolve("sass-loader"),
                    }
                ]
            }
        ]
    },
    plugins: [
        new HWP(
            {
                template: path.join(__dirname, '/src/index.html')
            }
        ),
        new ExtractTextPlugin('style.css'),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {
        disableHostCheck: true
    },

}