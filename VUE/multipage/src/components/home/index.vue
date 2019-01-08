<template>
	<div class="home-box">
		<div class="container">
			<ul>
				<li><router-link to="/mysearch">搜索</router-link></li>
				<li><router-link to="/mydetails">详情</router-link></li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'home'
	}
</script>
<style scoped>
	.container {
		margin: 0 auto;
		padding: 0 10px;
		width: 1020px;
	}
	
</style>
