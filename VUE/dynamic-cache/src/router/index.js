import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js';
import routes from './routes.js';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	var cachePage = store.getters.getCachePage;
	var isCachePage = store.getters.getIsCachePage;

	// 判断当前页面是否要缓存在缓存数组中的页面
	for (var i = 0; i < isCachePage.length; i++) {
		if (to.name != cachePage[i] && isCachePage[i].indexOf(to.name) == -1) {
			store.commit('setIsCachePage', {
				name: cachePage[i],
				type: 'del'
			});
		}
	}

	if (to.meta.keepAlive) {
		// 不设置cache时，所有页面缓存
		store.commit('setIsCachePage', {
			name: to.name,
			cache: to.meta.cache || []
		});
	}

	next();

})

export default router
