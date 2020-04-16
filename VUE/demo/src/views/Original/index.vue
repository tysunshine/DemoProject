<template>
	<div class="original-wp">
		<div class="title">原生VUE</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
export default {
	name: 'originalLayout',
	data () {
		return {

		}
	}
}	
</script>
<style lang="scss" scoped>
.original-wp {
	width: 100%;
	height: 100%;
	.title {
		padding: 0 20px;
		height: 60px;
		line-height: 60px;
		background: #efefef;
	}
	.content {
		padding: 10px 0;
		width: 100%;
		height: calc(100% - 60px);
		overflow: auto;
		box-sizing: border-box;
	}
}
</style>
