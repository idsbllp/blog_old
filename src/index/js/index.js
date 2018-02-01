import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.config.debug = true; //开启错误提示
Vue.use(VueRouter);
Vue.use(VueResource);

// 加载router组件
import App from '../template/app.vue';
import Index from '../template/user/index.vue';
import ArticleList from '../template/article/article_list.vue';
import ArticleViewer from '../template/article/article_viewer.vue';
import MyInfor from '../template/user/my_infor.vue';
import About from '../template/user/about.vue';

const routes = [
    {
        path: '/',
        component: Index,
        children: [
            // 首页
            {
                path: '/',
                alias: '/index',
                component: ArticleList
            },
            // 专题
            {
                path: '/article',
                component: ArticleList
            },
            // 文章
            {
                path: '/article/:articleName',
                component: ArticleViewer
            },
            // 关于
            {
                path: 'about',
                component: About
            }
        ]
    },
];

const router = new VueRouter({
    routes
});
// 更改网站 title
Vue.directive('title', {
    inserted: function (el) {
        document.title = el.innerText;
        el.remove();
    }
});
const apps = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});

import "../css/index.css"
import "../css/LanEditor.css"
import '../css/atom-one-light.css';
import '../css/sweetalert.css';
import '../../img/asd.jpg';
