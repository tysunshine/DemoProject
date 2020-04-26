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

	if (to.meta.cache) {

		store.commit('setCachePage', {
			path: to.path
		})

		console.log(store.state.cachePage);

		// console.log(store)
	}

	next();

})

export default router
