<template>
	<div class="main">
		<div class="left">
			<ul>
				<li>
					<!-- <router-link :to=""></router-link> -->
				</li>
			</ul>
		</div>
		<div class="right">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	
export default {
	name: 'index'
}	
</script>
<style lang="scss">
.main {
	height: 100%;
	&:after {
		content: '';
		display: block;
		clear: both;
	}
	.left {
		float: left;
		width: 200px;
		height: 100%;

		ul {
			margin: 0;
			padding: 0;
		}
		li {
			margin-bottom: 10px;
		}
	}
	.right {
		float: left;
		width: calc(100% - 200px);
		height: 100%;
	}
}
</style>
