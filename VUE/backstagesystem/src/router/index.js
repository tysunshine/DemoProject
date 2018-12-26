import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Layout from '@/views/layout/index'

import tools from '@/utils/tools'


Vue.use(Router)

var router = new Router({
	routes: [
		{path: '/404', component: () => import('@/views/error/404')},
		{path: '/', component: () => import('@/views/login/index')}
	]
})


/**
 * 页面切换之前
 * 页面刷新时addRoutes添加的路由会丢失，需要重新添加
 * 使用nowPath记录是否是第一次进入页面，当nowPath等于lastPath的时候即是刷新页面
 */
router.beforeEach((to, from, next) => {
	// 判断有没有登录，没登录就指向登录页面
	if ( !tools.getStore('userinfo') && to.path != '/' ) {
		router.replace('/');
		next();

	} else {
		var menus = tools.getStore('menuData');
		var roots = tools.getStore('rootList');

		// 判断有没有权限访问页面
		if ( roots && roots.indexOf(to.path) == -1 ) {
			next('/404');

		//判断是否存储路由，没存储表明可以直接next
		} else {
			if ( tools.getStore('nowPath') ) {
				var href = window.location.href;
				var lastPath = href.slice(href.lastIndexOf('/'));

				// 判断是否是刷新页面，刷新页面就使用replace
				if ( lastPath == to.path ) {
					tools.removeStore('nowPath');
					menus = tools.getRoutes(menus);
					router.addRoutes(menus);
					router.replace(to.path);
				}
			}
			next();
		}
	}
})

/**
 * 页面切换之后
 * 使用nowPath记录当前的路由
 */
router.afterEach((to, from, next) => {
	tools.setStore('nowPath', to.path);
})

export default router;
