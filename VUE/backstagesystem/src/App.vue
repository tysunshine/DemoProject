<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
	@import "./style/index.scss";
	@import "element-ui/lib/theme-chalk/index.css";
	@import "./assets/icon/iconfont.css";
	#app {
		height: 100%;
	}
</style>
