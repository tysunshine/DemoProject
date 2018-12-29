<template>
	<div class="app-main-box">
		<keep-alive :include="cachedViews">
			<router-view></router-view>
		</keep-alive>
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