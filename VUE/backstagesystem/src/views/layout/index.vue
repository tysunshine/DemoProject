<template>
	<div class="layout-box">
		<header-nav></header-nav>
		<sidebar></sidebar>
		<div class="main">
			<tags-view></tags-view>
			<app-main></app-main>
		</div>
	</div>
</template>
<script>
	import headerNav from './header-nav.vue'
	import sidebar from './sidebar.vue'
	import tagsView from './tags-view.vue'
	import appMain from './app-main.vue'
	
	export default {
		name: 'layout',
		components: {
			headerNav, sidebar, tagsView, appMain
		}
	}
</script>
<style lang="scss" scoped>
	.layout-box {
		position: relative;
		.main {
			position: absolute;
			top: 62px;
			left: 180px;
			right: 0;
			bottom: 0;
		}
	}
</style>