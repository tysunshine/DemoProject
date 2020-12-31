<!-- 模板 -->
<template>
  <div class="com-main-wp">
    <div class="list">
      <div class="item" v-for="(item, index) in keepList" :key="index"
        :to="item.path">
        {{item.text}}    
      </div>
    </div>
    <keep-alive :include="include" :exclude="exclude">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>

export default {
  name: 'com-main',
  data () {
    return {

    }
  },
  computed: {
    keepList () {
      var list = this.$store.getters.keepList;
      return list;
    },

    include () {
      return this.$store.getters.keepList.map(item => {
        return item.name
      })
    },

    exclude () {
      return this.$store.getters.exclude;
    },

  },
  watch: {
    // '$route' (val) {
    //   this.routeChange(this.$route);
    // }
  },
  mounted () {
    // this.routeChange(this.$route);

  },
  methods: {
    routeChange (data) {
      for (var i = 0; i < this.keepList.length; i++) {
        var item = this.keepList[i];
        if (data.fullPath == item.path) {

          break;
        }
      }
      if (i >= this.keepList.length) {
        this.$store.commit('keepList', [this.keepList.length, 0, {
          path: data.fullPath,
          name: data.name,
          text: data.meta.text
        }])
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.com-main-wp {
  .list {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    .item {
      float: left;
      margin-right: 15px;
    }
  }
}
</style>