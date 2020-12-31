<!-- 模板 -->
<template>
  <el-container class="layout-wp">
    <el-header class="this-el-header" :height="showHeader ? '70px' : '0'">
      <com-header></com-header>
    </el-header>
    <el-container>
      <el-aside class="this-el-aside" :width="showAside ? '250px' : '0'">
        <com-aside></com-aside>
      </el-aside>
      <el-main class="this-el-main">
        <com-main></com-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'layout',
  computed: {
    showHeader () {
      return this.$store.getters.LAYOUT_SHOWHEADER;
    },
    showAside () {
      var path = this.$tools.excludeEmpty(this.$route.path); // 排除/empty路由
      var root = this.$tools.menu.root(path, 1);
      return (this.$store.getters.LAYOUT_SHOWASIDE && root.children && root.children.length) ? true : false;
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-wp {
  height: 100vh;
  background: #F5F5F5;

  .this-el-header {
    padding: 0;
    overflow: hidden;
    transition: height .3s;
  }

  .this-el-aside {
    background: #fff;
    transition: width .3s;
  }

  .this-el-main {
    padding: 0;
  }
}
</style>