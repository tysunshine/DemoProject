import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

// 公用组件
import Manager from '@/components/manager.js';
Vue.use(Manager);

// jquery
import $ from 'jquery';
window.$ = window.jQuery = window.jquery = $;

// 全局工具
import $tools from '@/assets/js/tools.js';
Vue.prototype.$tools = $tools;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
