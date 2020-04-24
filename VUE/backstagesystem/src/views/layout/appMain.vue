<template>
	<div class="app-main-box">
		<transition name="fade-transform" mode="out-in">
			<keep-alive :include="cachedViews">
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'

	export default {
		name: 'appMain',
		computed: {
			...mapGetters({
				cachedViews: 'TAGSVIEW_CACHEDVIEWS'
			})
		}
	}
</script>
<style lang="scss" scoped>
.app-main-box {
	width: 100%;
	height: calc(100% - 66px);
	overflow: auto;
}
</style>

