<template>
	<div class="layout-box">
		<my-header></my-header>
		<div class="main">
			<router-view/>
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
	.main {
		padding-top: 31px;
	}
</style>