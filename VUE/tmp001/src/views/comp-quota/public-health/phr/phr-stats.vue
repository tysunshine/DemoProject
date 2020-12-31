<!-- 健康档案 -->
<template>
  <div class="phr-stats-wp">
    健康档案管理统计分析
    <br>
    <button @click="i++">+</button>{{i}}
    <br>
    <router-link :to="{path: '/children-stats', query: {a: 1, b: 2}}">测试参数跳转</router-link>
  </div>
</template>
<script>
export default {
  name: 'phr-stats',
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
.phr-stats-wp {
  
}
</style>