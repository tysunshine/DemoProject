<!-- 内容 -->
<template>
  <div class="com-main-wp">
    <com-keep-alive></com-keep-alive>
    <div class="main-wrapper">
      <keep-alive :include="include" :exclude="exclude">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  name: 'com-main',
  computed: {
    include () {
      return this.$store.getters.LAYOUT_KEEPLIST.map(item => {
        return item.name;
      })
    },
    exclude () {
      return this.$store.getters.LAYOUT_EXCLUDE;
    }
  },
}
</script>
<style lang="scss" scoped>
.com-main-wp {
  height: 100%;
  background: #fff;
  .main-wrapper {
    padding: 20px;
    height: calc(100% - 41px);
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>