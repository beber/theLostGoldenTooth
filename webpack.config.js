var path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        app: [path.resolve(__dirname, 'client/src/js/main.js')],
        mobile: [path.resolve(__dirname, 'client/src/js/mobile.js')],
        vendor: ['phaser'],
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'public/dist'),
        publicPath: './dist/',
        filename: '[name].js'
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'all'
        }
    }
};