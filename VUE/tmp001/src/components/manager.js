/**
 *公用组件引入
 */
const Manager = function (Vue) {
	Vue.component("com-header", () => import('./com-header.vue')); // 头
	Vue.component("com-aside", () => import('./com-aside.vue')); // 侧边栏
	Vue.component("com-main", () => import('./com-main.vue')); // 重要内容
	Vue.component("com-keep-alive", () => import('./com-keep-alive.vue')); // 缓存页面组件
	
	Vue.component("com-table", () => import('./com-table.vue')); // 公共表格
}

export default Manager;