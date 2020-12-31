<!-- 页面2 -->
<template>
  <div class="page2-wp">
    页面2
    <br>
    <button @click="i++">+</button>{{i}}
  </div>
</template>
<script>
export default {
  name: 'page2',
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
.page2-wp {
  
}
</style>