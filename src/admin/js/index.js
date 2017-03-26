import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.config.debug = true; //开启错误提示
Vue.use(VueRouter);
Vue.use(VueResource);

// 加载router组件
import App from '../template/app.vue';
import All from '../template/article/all.vue';
import Tags from '../template/article/tags.vue';
import Add from '../template/article/add.vue';
import Modify from '../template/article/modify.vue';
import TagInfor from '../template/article/tag_infor.vue';

const $404 = {
  template: '<div> 404 NOT FOUND </div>'
};

const routes = [
    {
        name: '$index',
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
            }
        ]
    }, {
        path: '/add-article',
        component: Add
    }, {
        path: '/modify/:article',
        component: Modify
    }, {
        name: '$404',
        path: '/404',
        component: $404
    }, {
        path: '*',
        redirect: '404'
    }
];

const router = new VueRouter({
    routes
});

const apps = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});


// online editor. see: http://lanfly.github.io/laneditor/doc/
import '../css/index.css';
import '../css/LanEditor.css';
import '../../../node_modules/highlight.js/styles/atom-one-light.css';
import '../../../node_modules/sweetalert/dist/sweetalert.css';   
// import '../../../node_modules/highlight.js/styles/monokai.css';

