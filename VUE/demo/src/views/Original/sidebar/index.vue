<template>
	<div class="sidebar-wp clearfix">
		<div class="pull-left">
			<my-side-menu1 :menus="menus"></my-side-menu1>
		</div>
		<div class="pull-left">
			<my-side-menu2 :menus="menus"></my-side-menu2>
		</div>
		<div class="pull-left toggle-item" :style="{width: collapsed ? '80px' : '200px'}">
			<button class="toggle-btn" @click="toggleType()">切换</button>
			<my-side-menu3 :menus="menus" :collapsed="collapsed"></my-side-menu3>
		</div>
	</div>
</template>
<script>

import MySideMenu1 from './components/MySideMenu1.vue';
import MySideMenu2 from './components/MySideMenu2.vue';
import MySideMenu3 from './components/MySideMenu3.vue';

import {menus} from './assets/js/menus.js';
	
export default {
	name: 'sidebar',
	data () {
		return {
			menus: menus,

			collapsed: false, // 折叠
		}
	},
	components: {
		MySideMenu1,
		MySideMenu2,
		MySideMenu3,
	},
	methods: {
		toggleType () {
			this.collapsed = !this.collapsed;
		}
	}
}	
</script>
<style lang="scss" scoped>
.sidebar-wp {
	width: 100%;
	height: 100%;
	background: #eee;
	overflow: auto;

	& > div {
		width: 200px;
		height: 100%;
		&:nth-child(2n+1) {
			background: #fff;
		}
		&:nth-child(2n) {
			background: rgba(0, 255, 0, 0.1);
		}
	}

	/*切换状态导航栏*/
	.toggle-item {
		transition: all .3s;
		.toggle-btn {
			margin-top: 10px;
			margin-bottom: 20px;
			padding: 0 10px;
			border: 1px solid #ccc;
			background: #fff;
			border-radius: 3px;
			min-width: 60px;
			height: 30px;
			cursor: pointer;
		}
	}

}
</style>
