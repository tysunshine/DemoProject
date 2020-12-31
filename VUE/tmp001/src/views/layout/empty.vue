<!-- 空白切换页面 -->
<template>
  <div class="empty-wp"></div>
</template>
<script>
export default {
  name: 'empty',
  mounted () {
    this.$router.replace(this.$tools.storage.get('emptyPath').fullPath);
  },
}
</script>