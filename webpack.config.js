const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (argv) => ({
    mode: argv.mode,
    entry: ['@babel/polyfill', './src/index.js'],
    devtool: argv.mode === 'production' ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]',
        filename:
            argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                type: 'asset/resource',
                test: /\.(png|jpe?g|gif)$/i,
                generator: {
                    filename: 'assets/[hash][ext][query]'
                },
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Frontend Mentor | Calculator App'
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({'patterns': [
            {from:'./public/', to:'./'}
        ]}),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    devServer: {
        static: './dist',
        hot: true,
    },
});