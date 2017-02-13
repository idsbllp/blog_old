var myModule = 'admin';

var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/' + myModule + '/js/index.js',
    output: {
        path: './public/static/' + myModule + '/js/',
        publicPath: './application/' + myModule + '/view/index/',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract('style-loader','css-loader','autoprefixer-loader?browsers=last 2 versions')
            },
            {
                test: /\.less$/,
                loader: 'style!css!less?sourceMap!autoprefixer-loader?browsers=last 2 versions'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192',
                query: {
                    name: '../img/[name].[ext]'
                }
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '../fonts/[name].[ext]'
                }
            }
        ],
        vue: {
            loaders: {
                css: 'style!css!autoprefixer-loader?browsers=last 2 versions',
            }
        },
        resolve: {
            extensions: ['', '.js', '.vue'],
            alias: {
                filter: path.join(__dirname, './src/filters'),
                components: path.join(__dirname, './src/component'),
            },
        },
    },
    plugins: [
        new extractTextPlugin('../css/index.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
}
