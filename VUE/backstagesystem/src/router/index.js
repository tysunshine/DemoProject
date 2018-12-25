import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Layout from '@/views/layout/index'


Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '',
			redirect: 'login'
		},
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login/index')
		}
	]
})
