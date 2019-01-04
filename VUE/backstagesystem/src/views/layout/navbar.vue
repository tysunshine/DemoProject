<template>
	<div class="navbar-box">
		<i class="collapse-btn iconfont icon-webicon03" @click="setCollapse"></i>
		<el-breadcrumb class="crumb" separator="/">
			<transition-group name="breadcrumb">
				<el-breadcrumb-item v-for="(item, index) in crumbs" :key="item.text">
					<router-link :to="{path: item.path}" v-if="item.path">{{item.text}}</router-link>
					<span v-else>{{item.text}}</span>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'

	export default {
		name: 'navbar',
		computed: {
			...mapGetters({
				isCollapse: 'SIDEBAR_ISCOLLAPSE',
				crumbs: 'NAVBAR_CRUMBS'
			})
		},
		methods: {
			setCollapse () {
				this.$store.commit('SIDEBAR_ISCOLLAPSE', !this.isCollapse);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.navbar-box {
		padding-top: 2px;
		height: 30px;
		box-sizing: border-box;
		&::after {
			content: '';
			display: block;
			clear: both;
		}
		.collapse-btn {
			position: relative;
			float: left;
			margin: 0 10px;
			width: 26px;
			height: 26px;
			cursor: pointer;
			font-size: 26px;
		}
		.crumb {
			float: left;
			margin-top: 7px;
		}
	}
</style>