
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.config.debug = true; //开启错误提示
Vue.use(VueRouter);
Vue.use(VueResource);

import App from '../template/app.vue';
import All from '../template/article/all.vue';
import Tags from '../template/article/tags.vue';
import Add from '../template/article/add.vue';
import TagInfor from '../template/article/tag_infor.vue';

const routes = [
    {
        path: '/',
        redirect: '/all-article'
    }, {
        path: '/all-article',
        component: All
    }, {
        path: '/article-tags',
        component: Tags,
        children: [
            {
                path: '/article-tags/:tag',
                component: TagInfor
            },/* {
                path: '/',
                redirect: '/article-tags/暂无标签'
            }*/
        ],
    }, {
        path: '/add-article',
        component: Add
    },
];

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});

const apps = new Vue({
    router,
    el: '#app',
    render: render => render(App)
});

import '../css/index.css';

// online editor. see: http://lanfly.github.io/laneditor/doc/
import '../css/LanEditor.css';
import '../../../node_modules/highlight.js/styles/atom-one-light.css';
import '../../../node_modules/sweetalert/dist/sweetalert.css';   
// import '../../../node_modules/highlight.js/styles/monokai.css';

