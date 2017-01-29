var path = require('path');

module.exports = {
    entry: './src/js/index.js',
    //定义webpack输出的文件，我们在这里设置了
    //让打包后生成的文件放在dist文件夹下的build.js文件中
    output: {
        path: './public/static/index/js/',
        publicPath: './application/index/view/index/',
        filename: 'index.js'
    },
    module: {
        // 加载器
        loaders: [
            // 解析.vue文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            // 转化ES6的语法
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            // 编译css并自动添加css前缀
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer-loader?browsers=last 2 versions'
            },
            //.scss 文件想要编译，scss就需要这些东西！来编译处理
            //install css-loader style-loader sass-loader node-sass --save-dev
            {
                test: /\.less$/,
                loader: 'style!css!less?sourceMap!autoprefixer-loader?browsers=last 2 versions'
            },
            // 图片转化，小于8K自动转化为base64的编码
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            //html模板编译？
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '../fonts/[name].[hash:7].[ext]'
                }
            }
        ],
        // .vue的配置。需要单独出来配置，其实没什么必要--因为我删了也没保错，不过这里就留这把，因为官网文档里是可以有单独的配置的。
        vue: {
            loaders: {
                css: 'style!css!autoprefixer-loader?browsers=last 2 versions',
            }
        },
        resolve: {
            // require时省略的扩展名，如：require('module') 不需要module.js
            extensions: ['', '.js', '.vue'],
            // 别名，可以直接使用别名来代表设定的路径以及其他
            alias: {
                filter: path.join(__dirname, './src/filters'),
                components: path.join(__dirname, './src/component')
            }
        }
    }
}
