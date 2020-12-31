<!-- 页面1 -->
<template>
  <div class="page1-wp">
    页面1
    <br>
    <button @click="i++">+</button>{{i}}
    <br>
    <router-link to="/page2?a=1">更新page2</router-link>
    <br>
  </div>
</template>
<script>
export default {
  name: 'page1',
  data () {
    return {
      i: 0
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.page1-wp {
  
}
</style>