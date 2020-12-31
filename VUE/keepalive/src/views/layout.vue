<!-- 模板 -->
<template>
  <el-container class="layout-wp">
    <el-header class="this-el-header" height="100px">
      原理：路由改变的时候，判断keepList中是否存在
        <br>
        如果不存在则添加；
        <br>
        如果存在，但是参数对不上，这先给exclude添加其name，然后异步清空exclude；
        <br>
        如果存在，参数也对，不管
    </el-header>
    <el-container>
      <el-aside class="this-el-aside">
        <router-link to="/page1">页面1</router-link>
        <br>
        <router-link to="/page2">页面2</router-link>
        <br>
        <router-link to="/page3">页面3</router-link>
      </el-aside>
      <el-main class="this-el-main">
        <com-main></com-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>

import comMain from '@/components/com-main.vue';

export default {
  name: 'layout',
  components: {
    comMain,
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.layout-wp {
  height: 100%;
  .this-el-header {
    background: green;
  }
  .this-el-aside {
    background: yellow;
  }
}
</style>