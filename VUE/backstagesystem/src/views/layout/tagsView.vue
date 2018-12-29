<template>
	<div class="tags-view-box">
		<div class="wrapper-box" ref="wrapperBox">
			<ul class="scroll-box" ref="scrollBox">
				<li :class="{'is-checked': item.path == $route.path}" v-for="(item, idx) in visitedViews" @click="routeLink(item)">
					{{item.text}}
					<i class="close-btn el-icon-close" @click.stop="delVisitedView(item, idx)"></i>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import tools from '@/utils/tools'

	export default {
		name: 'tagsView',
		computed: {
			...mapGetters({
				visitedViews: 'TAGSVIEW_VISITEDVIEWS'
			})
		},
		watch: {
			$route () {
				this.$store.commit('ADD_TAGSVIEW_VISITEDVIEWS', this.$route);
			}
		},
		mounted () {
			// 监听左右滚动事件
			this.$refs.wrapperBox.addEventListener('DOMMouseScroll', this.handler, false);
    		this.$refs.wrapperBox.addEventListener('mousewheel', this.handler, false);

    		this.$store.commit('ADD_TAGSVIEW_VISITEDVIEWS', this.$route);
		},
		methods: {
			// 点击删除按钮
			delVisitedView (item, idx) {
				if ( this.visitedViews.length == 1 ) {
					this.$router.push('/index');

				} else if ( item.path == this.$route.path ) {
					var path = this.visitedViews[this.visitedViews.length - 1].path;
					
					if ( idx == this.visitedViews.length - 1 ) {
						path = this.visitedViews[this.visitedViews.length - 2].path;
					}
					this.$router.push(path);
				}

				this.$store.commit('DEL_TAGSVIEW_VISITEDVIEWS', item);
			},
			// 点击tag按钮
			routeLink (item) {
				this.$router.push(item.path);
			},
			// 滚动逻辑
			handler (event){
				var oWrapper = this.$refs.wrapperBox;
				var oScroll = this.$refs.scrollBox;

				var detail = event.wheelDelta || event.detail;
				var moveForwardStep = 1;
				var moveBackStep = -1;
				var step = 0;	
				if(detail < 0){
						step = moveBackStep*100;
				}else{
					step = moveForwardStep * 100;
				}
				
				var iLeft = parseInt(tools.getStyle(oScroll, 'left'));
				iLeft += step;
				if ( parseInt(tools.getStyle(oScroll, 'height')) < 40 && iLeft < oWrapper.clientWidth - oScroll.clientWidth - 2 ) {
					iLeft = oWrapper.clientWidth - oScroll.clientWidth - 2;
				}
				if ( iLeft > 0 ) {
					iLeft = 0;
				}
				tools.setStyle(oScroll, {
					left: iLeft + 'px'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.tags-view-box {
		width: 100%;
		height: 34px;
		border-top: 1px solid #d8dce5;
		border-bottom: 1px solid #d8dce5;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
		overflow: hidden;
		.wrapper-box {
			position: relative;
			width: 100%;
			height: 60px;
			overflow-x: scroll;
			overflow-y: hidden;

			.scroll-box {
				position: absolute;
				top: 0;
				left: 0;
				padding: 0 20px;
				white-space: nowrap;

				&::after {
					content: '';
					display: block;
					clear: both;
				}
				li {
					float: left;
					margin-top: 4px;
					padding: 0 8px;
					box-sizing: border-box;
					border: 1px solid #d8dce5;
					color: #495060;
					font-size: 12px;
					line-height: 24px;
					cursor: pointer;
					.close-btn {
						width: 16px;
						height: 16px;
						text-align: center;
						line-height: 16px;
						font-size: 12px;
						border-radius: 50%;
						&::before {
							display: inline-block;
							transform: scale(.6);
						}
						&:hover {
							background: #b4bccc;
							color: #fff;
						}
					}
				}
				li+li {
					margin-left: 4px;
				}
				li.is-checked {
					background: #42B983;
					border-color: #42B983;
					&::before {
						content: '';
						display: inline-block;
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background: #fff;
					}
				}
			}
		}
	}
</style>