const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { loader: 'css-loader', options: { url: true } }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: '../img'
                    }
                }]
            },
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: './src/img', to: './img' },
        ]),
        new HtmlWebpackPlugin({
                template: './src/index.html'
            }
        ),
        new MiniCssExtractPlugin({
            filename: './css/style.css'
        })
    ]
};