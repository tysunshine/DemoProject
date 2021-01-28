<template>
	<div>
		<div class="app-wrapper">
			<side-bar class="sidebar-container" v-if="headShow"></side-bar>
			<div v-if="headShow" class="main-container">
				<nav-bar></nav-bar>
				<app-main class="datacoop-main"></app-main>
			</div>
			<div class="null-width" v-else>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import { AppMain, NavBar, SideBar } from './components/index';
	export default {
		name: 'layout',
		data() {
			return {
				headShow: true,
			}
		},
		components: {
			NavBar,
			SideBar,
			AppMain,
		},
		watch: {
			$route(to, from) {
				this.headShowFun(to.path);
			},
		},
		created: function() {
			var path = this.$route.path;
			this.headShowFun(path);
		},
		methods: {
			headShowFun(path) {
				if(path == '/login') {
					this.headShow = false;
				} else {
					this.headShow = true
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
		&:after {
			content: "";
			display: table;
			clear: both;
		}
		overflow: hidden;
	}
	
	.main-container {
		height: 100vh;
		transition: margin-left 0.28s;
		margin-left: 240px;
		background-color: #fff;
	}
	
	.null-width {
		width: 0;
		height: 100vh;
		background-color: #fff;
		overflow: hidden;
	}
	.datacoop-main{
		padding: 15px;
		width: 100%;
		height: calc(100% - 65px);
		box-sizing: border-box;
		overflow-y: auto;
		overflow-x: hidden;
		background: #F1F1F1;
	}
</style>