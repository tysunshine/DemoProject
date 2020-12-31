<!-- 0-6岁儿童健康管理 -->
<template>
  <div class="children-stats-wp">
    0-6岁儿童健康管理
    <br>
    <button @click="i++">+</button>{{i}}
  </div>
</template>
<script>
export default {
  name: 'children-stats',
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
.children-stats-wp {
  
}
</style>