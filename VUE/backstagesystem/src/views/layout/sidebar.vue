<template>
	<div class="sidebar-box">
		<el-menu class="item-box"
			mode="vertical"
			text-color="#333"
			background-color="#aff"
			:router="true">
			<el-menu-item index="/index">首页</el-menu-item>
			<el-submenu index="/worker">
				<template slot="title">职工管理</template>
				<el-menu-item index="/workerType" class="child-item">职工类型</el-menu-item>
				<!-- <el-menu-item index="/workerList" class="child-item">职工列表</el-menu-item> -->
			</el-submenu>
			<el-submenu index="/student">
				<template slot="title">学生管理</template>
				<el-menu-item index="/studentType" class="child-item">学生类型</el-menu-item>
				<el-menu-item index="/studentList" class="child-item">学生列表</el-menu-item>
			</el-submenu>
		</el-menu>

		<!-- <el-menu class="item-box"
			mode="vertical"
			text-color="#333"
			background-color="#aff"
			:router="true">
			<div v-for="(item, index) in menuData" :key="index">
				<el-menu-item v-if="item.children.length == 1" :index="item.children[0].path">{{item.children[0].text}}</el-menu-item>
				<el-submenu v-else :index="item.path">
					<template slot="title">{{item.text}}</template>
					<el-menu-item v-for="(list, idx) in item.children" :index="list.path" class="child-item" :key="index + '-' + idx">{{list.text}}</el-menu-item>
				</el-submenu>
			</div>
		</el-menu> -->
	</div>
</template>
<script>
	import tools from '@/utils/tools'

	export default {
		name: 'sidebar',
		data () {
			return {
				menuData: []
			}
		},
		created () {
			this.menuData = tools.getStore('menuData');
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