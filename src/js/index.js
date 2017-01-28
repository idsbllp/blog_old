// require('vue');
var a = require('./bala.js');
console.log(a);

//es6语法：
import Vue from "vue"; //其实不用写完，会自动查找。可以直接写import Vue from "vue";
//外部引入别的库都可以用这样的方式，比如jquery等。。
//引入我们编写的测试用vue文件。
import app from '../template/hello.vue';
Vue.config.debug = true;//开启错误提示
new Vue(app);
