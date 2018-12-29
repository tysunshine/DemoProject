<template>
	<div :class="{'is-collapse': isCollapse}" class="sidebar-box">
		<el-menu class="items-box"
			mode="vertical"
			text-color="#333"
			background-color="#aff"
			:default-active="$route.path"
			:collapse="isCollapse"
			:router="true">
			<div v-for="(item, index) in menuData" :key="index">
				<el-menu-item v-if="item.hidden" :index="item.children[0].path">
					<div class="items-cont">
						<i class="items-icon" :class="item.meta.icon"></i>
						<span class="items-text">{{item.children[0].meta.text}}</span>
					</div>
				</el-menu-item>
				<el-submenu v-else :index="item.path">
					<template slot="title">
						<div class="items-cont">
							<i class="items-icon" :class="item.meta.icon"></i>
							<span class="items-text">{{item.meta.text}}</span>
						</div>
					</template>
					<el-menu-item v-for="(list, idx) in item.children" :index="list.path" class="child-item" :key="index + '-' + idx">{{list.meta.text}}</el-menu-item>
				</el-submenu>
			</div>
		</el-menu>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import tools from '@/utils/tools'

	export default {
		name: 'sidebar',
		data () {
			return {
				menuData: []
			}
		},
		computed: {
			...mapGetters({
				isCollapse: 'SIDEBAR_ISCOLLAPSE'
			})
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
		overflow: hidden;
		transition: width 0.3s;
		.items-box {
			width: auto;
			border: none;
			.items-cont {
				position: absolute;
				top: 0;
				left: 0;
				padding-left: 20px;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				transition: padding-left 0.3s 0.2s;
				.items-icon {
					margin-right: 16px;
				}
			}
			.child-item {
				min-width: auto;
				background: #9dd !important;
			}
			.child-item:hover {
				background: #88CCCC !important;
			}
		}
	}
	.sidebar-box.is-collapse {
		width: 30px;
		.items-cont {
			padding-left: 7px;
		}
	}
</style>