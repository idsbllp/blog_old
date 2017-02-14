
import Vue from "vue";
import VueRouter from "vue-router";

import App from '../template/app.vue';
Vue.config.debug = true; //开启错误提示

Vue.use(VueRouter);

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});
    
const apps = new Vue({
    router,
    el: '#app',
    render: render => render(App)
});


// import "../fonts/Arsenal-Regular.ttf";
import "../css/index.css";

// online editor. see: http://lanfly.github.io/laneditor/doc/
import "../css/LanEditor.css";
import "../../../node_modules/highlight.js/styles/agate.css";

// pictures

import "../img/07224141D943EBC03B8BD9DCCC09658A.jpg"