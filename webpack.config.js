var path = require('path');

module.exports = {
    entry: './src/js/index.js',
    //����webpack������ļ�������������������
    //�ô�������ɵ��ļ�����dist�ļ����µ�build.js�ļ���
    output: {
        path: './public/static/index/js/',
        publicPath: './application/index/view/index/',
        filename: 'index.js'
    },
    module: {
        // ������
        loaders: [
            // ����.vue�ļ�
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            // ת��ES6���﷨
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            // ����css���Զ����cssǰ׺
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer-loader?browsers=last 2 versions'
            },
            //.scss �ļ���Ҫ���룬scss����Ҫ��Щ�����������봦��
            //install css-loader style-loader sass-loader node-sass --save-dev
            {
                test: /\.less$/,
                loader: 'style!css!less?sourceMap!autoprefixer-loader?browsers=last 2 versions'
            },
            // ͼƬת����С��8K�Զ�ת��Ϊbase64�ı���
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            //htmlģ����룿
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
        // .vue�����á���Ҫ�����������ã���ʵûʲô��Ҫ--��Ϊ��ɾ��Ҳû�����������������ѣ���Ϊ�����ĵ����ǿ����е��������õġ�
        vue: {
            loaders: {
                css: 'style!css!autoprefixer-loader?browsers=last 2 versions',
            }
        },
        resolve: {
            // requireʱʡ�Ե���չ�����磺require('module') ����Ҫmodule.js
            extensions: ['', '.js', '.vue'],
            // ����������ֱ��ʹ�ñ����������趨��·���Լ�����
            alias: {
                filter: path.join(__dirname, './src/filters'),
                components: path.join(__dirname, './src/component')
            }
        }
    }
}
