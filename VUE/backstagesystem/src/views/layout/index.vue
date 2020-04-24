<template>
	<div class="layout-box">
		<header-nav></header-nav>
		<sidebar></sidebar>
		<div :class="{'is-collapse': isCollapse}" class="main">
			<navbar></navbar>
			<tags-view></tags-view>
			<app-main></app-main>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import headerNav from './headerNav.vue'
	import sidebar from './sidebar.vue'
	import navbar from './navbar.vue'
	import tagsView from './tagsView.vue'
	import appMain from './appMain.vue'
	
	export default {
		name: 'layout',
		computed: {
			...mapGetters({
				isCollapse: 'SIDEBAR_ISCOLLAPSE'
			})
		},
		components: {
			headerNav, sidebar, navbar, tagsView, appMain
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
			overflow: hidden;
		}
		.main.is-collapse {
			left: 30px;
		}
	}
</style>