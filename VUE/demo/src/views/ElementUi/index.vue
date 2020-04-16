<template>
	<div class="element-ui-wp">
		<div class="title">Element-Ui</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

export default {
	name: 'elementUiLayout',
	data () {
		return {

		}
	}
}	
</script>
<style lang="scss" scoped>
.element-ui-wp {
	width: 100%;
	height: 100%;
	.title {
		padding: 0 20px;
		height: 60px;
		line-height: 60px;
		background: #efefef;
	}
	.content {
		padding: 10px 20px;
		width: 100%;
		height: calc(100% - 60px);
		overflow: auto;
		box-sizing: border-box;
	}
}
</style>
