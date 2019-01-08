<template>
	<div class="layout-box">
		<my-header></my-header>
		<div class="container">
			<div class="header">用户信息</div>
			<ul class="nav">
				<li><router-link to="/">用户信息</router-link></li>
				<li><router-link to="/password">密码修改</router-link></li>
				<li><router-link to="/buyinfo">购买记录</router-link></li>
			</ul>
			<div class="main">
				<router-view/>
			</div>
		</div>
	</div>
</template>
<script>
	import myHeader from '@/components/myHeader'

	export default {
		name: 'layout',
		components: {
			myHeader
		}
	}
</script>
<style scoped>
	.container {
		position: relative;
		margin: 0 auto;
		padding: 0 10px;
		width: 1020px;
	}
	.header {
		font-size: 20px;
		line-height: 100px;
		text-align: center;
	}
	.nav {
		width: 200px;
		line-height: 40px;
		background: #f7fefa;
	}
	.nav li+li {
		border-top: 1px solid #ccc;
	}
	.nav li a {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.main {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		padding-top: 100px;
		padding-left: 210px;
		padding-right: 10px;
		box-sizing: border-box;
	}
</style>