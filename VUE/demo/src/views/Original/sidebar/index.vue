<template>
	<div class="sidebar-wp clearfix">
		<div class="pull-left">
			<my-side-menu1 :menus="menus"></my-side-menu1>
		</div>
		<div class="pull-left">
			<my-side-menu2 :menus="menus"></my-side-menu2>
		</div>
	</div>
</template>
<script>

import MySideMenu1 from './components/MySideMenu1.vue';
import MySideMenu2 from './components/MySideMenu2.vue';

import {menus} from './assets/js/menus.js';
	
export default {
	name: 'sidebar',
	data () {
		return {
			menus: menus
		}
	},
	components: {
		MySideMenu1,
		MySideMenu2,
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
		&:nth-child(1) {
			background: #fff;
		}
		&:nth-child(2) {
			background: rgba(0, 255, 0, 0.1);
		}
	}
}
</style>
