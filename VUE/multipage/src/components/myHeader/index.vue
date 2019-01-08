<template>
	<div class="my-header-box">
		<div class="container">
			<a class="shouye" href="index.html">首页</a>
			<a class="user" href="userSystem.html">用户信息</a>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'myHeader'
	}
</script>
<style scoped>
	.my-header-box {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 30px;
		border-bottom: 1px solid #ccc;
		background: #eee;
	}
	.container {
		margin: 0 auto;
		padding: 0 10px;
		width: 1020px;
		line-height: 30px;
	}
	.container::after {
		content: '';
		display: block;
		clear: both;
	}
	.shouye {
		float: left;
	}
	.user {
		float: right;
	}
</style>