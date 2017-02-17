
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.config.debug = true; //开启错误提示
Vue.use(VueRouter);
Vue.use(VueResource);

import App from '../template/app.vue';
import All from '../template/article/all.vue'
import Add from '../template/article/add.vue'

const routes = [
    { path: '/all-article', component: All },
    { path: '/add-article', component: Add }
];

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});
    
const apps = new Vue({
    router,
    el: '#app',
    render: render => render(App)
});


// import '../fonts/Arsenal-Regular.ttf';
import '../css/index.css';

// online editor. see: http://lanfly.github.io/laneditor/doc/
import '../css/LanEditor.css';
import '../../../node_modules/highlight.js/styles/agate.css';

