
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'static/index/js/index': './src/index/js/index.js',
        'static/admin/js/index': './src/admin/js/index.js',
        vendor: ['vue', 'jquery', 'highlight.js', 'sweetalert', 'marked']
    },
    output: {
        path: './public/',
        filename: '[name].js'
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
                loader: extractTextPlugin.extract('style-loader','css-loader', {
                    publicPath: '../../../'
                }),
            },
            {
                test: /\.less$/,
                loader: 'less!style!css!postcss'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query: {
                    limit: 8124,
                    name: './static/img/[name].[ext]'
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
                    name: './static/fonts/[name].[ext]'
                }
            },
            {
                test: './node_modules/highlight.js/lib/highlight.js',
                loader: 'expose?highlight.js'
            },
            {
                test: './node_modules/marked/lib/marked.js',
                loader: 'expose?marked'
            },
        ],
    },
    vue: { // vue 的配置
        loaders: {
            js: 'babel',
            less: extractTextPlugin.extract("css!less!postcss")
        }
    },
    postcss: () => {
        return [
            require('autoprefixer')
        ];
    }, 
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        //     filter: path.join(__dirname, './src/filters'),
        //     components: path.join(__dirname, './src/component'),
        },
    },
    plugins: [
        new extractTextPlugin('[name]/../../css/index.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            marked: 'marked',
            hljs: 'highlight.js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
       }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'static/utils/vendor.js' }),
    ],
}
