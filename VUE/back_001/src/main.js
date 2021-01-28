import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import "./assets/el-theme/index.css";
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引用echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import {get, post, postForm} from "./config/request.js";
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postForm = postForm;

import mixins from './mixins/index.js';
Vue.mixin(mixins)

import './assets/icon/iconfont.css';
import './assets/font/iconfont.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
