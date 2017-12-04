const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const DEV = process.env.NODE_ENV === 'dev';

const globals = {
    __ENV__: process.env.env,
    'api-url': process.env.apiUrl
};

const BASE_URL = 'http://localhost:4000';
const srcDir = path.join(__dirname, 'src');
const pubDir = path.join(__dirname, 'public');

const cssLoader = {
    loader: 'css-loader',
    options: {
        minimize: globals.__ENV__ !== 'dev',
        autoprefixer: {browsers: ['last 2 versions'], remove: true},
        zindex: false
    }
};

module.exports = {
    context: srcDir,
    entry: './index.js',
    output:{
        path: pubDir,
        publicPath: '/',
        filename: 'js/app-[hash].min.js',
    },
    devServer: {
            port: process.env.PORT || 3000,
            contentBase: './src',
            stats: {colors: true}
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-object-assign']
                },
                exclude: [/node_modules/]
            },
            // {
            //     test: /\.jsx?$/,
            //     loader: 'eslint-loader',
            //     exclude: [/node_modules/]
            // },
            {
                test: /\.scss|css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        cssLoader,
                        'resolve-url-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
        }),
        new ExtractTextPlugin('app.css'),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],
    devtool: NODE_ENV === 'dev' ? 'cheap-module-inline-source-map' : false
};

// if (DEV) {
//     module.exports.plugins = module.exports.plugins.concat([new OpenBrowserPlugin({url: BASE_URL})]);
// // } else {
// //     module.exports.plugins = module.exports.plugins.concat([
// //         new CleanWebpackPlugin(['public'], {
// //             root: __dirname,
// //             verbose: true,
// //             dry: false,
// //             exclude: ['favicon_32.png', 'favicon_152.png']
// //         })
// //     ]);
// }
