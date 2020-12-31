<!-- 首页 -->
<template>
  <div class="home-wp">
    首页
    <br>
    <button @click="i++">+</button>
    {{i}}
  </div>
</template>
<script>
export default {
  name: 'home',
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
.home-wp {
  
}
</style>