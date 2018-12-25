<template>
	<div class="sidebar-box">
		<el-menu class="item-box"
			mode="vertical"
			text-color="#333"
			background-color="#aff">
			<el-menu-item index="1">首页</el-menu-item>
			<el-submenu index="2">
				<template slot="title">职工管理</template>
				<el-menu-item index="2-1" class="child-item">职工类型</el-menu-item>
				<el-menu-item index="2-2" class="child-item">职工列表</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">学生管理</template>
				<el-menu-item index="3-1" class="child-item">学生类型</el-menu-item>
				<el-menu-item index="3-2" class="child-item">学生列表</el-menu-item>
			</el-submenu>
		</el-menu>

	</div>
</template>
<script>
	export default {
		name: 'sidebar',
		mounted () {
			var menuData = window.localStorage.getItem('menuData');
			console.log(JSON.parse(menuData));
		}
	}
</script>
<style lang="scss" scoped>
	.sidebar-box {
		width: 180px;
		height: calc(100vh - 62px);
		background: #aff;

		.item-box {
			.child-item {
				min-width: auto;
				background: #9dd !important;
			}
			.child-item:hover {
				background: #88CCCC !important;
			}
		}
	}
</style>