<template>
	<div class="tags-view-box">
		<div class="college-btn"></div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/index'}">首页</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'

	export default {
		name: 'tagsView',
		computed: {
			...mapGetters({
				isCollege: 'SIDEBAR_ISCOLLAPSE'
			})
		}
	}
</script>
<style lang="scss" scoped>
	.tags-view-box {
		padding-top: 2px;
		height: 30px;
		box-sizing: border-box;
		.college-btn {
			display: inline-block;
			width: 26px;
			height: 26px;
			background: #ccc;
		}
	}
</style>