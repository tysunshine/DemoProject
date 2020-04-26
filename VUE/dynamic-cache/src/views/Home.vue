<template>
  <div class="home">
  	<div class="sidebar">
  		<ul class="link-list">
	    	<li v-for="(aItem, aIndex) in routes" :key="aIndex"
	    		class="link-item">
	    		<router-link class="link-btn" :to="aItem.path">{{aItem.name}}</router-link>

	    		<ul v-if="aItem.children">
	    			<li v-for="(bItem, bIndex) in aItem.children" :key="bIndex">
	    				<router-link class="link-btn" :to="bItem.path">{{bItem.name}}</router-link>
	    			</li>
	    		</ul>
	    	</li>
	    </ul>
  	</div>
	    
    <div class="main">
    	<!-- <keep-alive :include="$store.state.cachePage">
    		<router-view></router-view>
    	</keep-alive> -->

    	<keep-alive :include="cachedViews">
			<router-view></router-view>
		</keep-alive>
    </div>
  </div>
</template>

<script>
import routes from '@/router/routes.js';
import {mapGetters} from 'vuex'


export default {
  name: 'Home',
  data () {
  	return {
  		routes: routes,
  	}
  },
  computed: {
	...mapGetters({
		cachedViews: 'getCachePage'
	})
  },
  mounted () {
  	// console.log(this.$store.state.cachePage)
  }
}
</script>
<style lang="scss" scoped>
.home {
	height: 100%;

	&:after {
		content: '';
		display: block;
		clear: both;
	}

	.sidebar {
		float: left;
		padding: 30px 10px;
		width: 200px;
		height: 100%;
		background: rgba(0, 255, 0, 0.1);
		box-sizing: border-box;

		.link-list {
			padding-left: 20px;
		
			.link-btn {
				display: block;
				margin-bottom: 15px;
			}
		}
	}

	.main {
		float: left;
		width: calc(100% - 200px);
		height: 100%;
		overflow: hidden;
		background: rgba(255, 255, 0, 0.1);
	}

}

		


</style>
