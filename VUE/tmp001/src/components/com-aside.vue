<!-- 侧边栏 -->
<template>
  <div class="com-aside-wp">
    <el-menu class="this-menu" :default-active="menuActive" router>
      <!-- 一级 -->
      <template v-for="aItem in sideList">
        <el-submenu v-if="aItem.children" :index="aItem.idxs.join('_')">
          <span class="text ul-t" slot="title">{{aItem.name}}</span>
          <!-- 二级 -->
          <template v-for="bItem in aItem.children">
            <el-submenu v-if="bItem.children" :index="bItem.idxs.join('_')">
              <span class="text ul-t" slot="title">{{bItem.name}}</span>
              <!-- 三级 -->
              <el-menu-item v-for="cItem in bItem.children" :index="cItem.path" :key="cItem.path">
                <span class="text li-t">{{cItem.name}}</span>
              </el-menu-item>
              <!-- 三级结束 -->
            </el-submenu>
            <el-menu-item v-else :index="bItem.path">
              <span class="text li-t">{{bItem.name}}</span>
            </el-menu-item>
          </template>
          <!-- 二级结束 -->
        </el-submenu>
        <el-menu-item v-else :index="aItem.path">
          <span class="text li-t">{{aItem.name}}</span>
        </el-menu-item>
      </template>
      <!-- 一级结束 -->
    </el-menu>

  </div>
</template>
<script>
export default {
  name: 'com-aside',
  data () {
    return {

      // 侧边导航栏列表
      sideList: [],

      // 当前激活的菜单
      menuActive: '',
    }
  },
  watch: {
    '$route.path' (val) {
      this.init(val);
    }
  },
  mounted () {
    this.init(this.$route.path);
  },
  methods: {
    init (path) {
      if (path == '/empty') {
        return;
      }
      this.menuActive = path;
      this.setMenuList(path); // 设置菜单列表
    },
    // 设置菜单列表
    setMenuList (path) {
      var rootMenu = this.$tools.menu.root(path, 1);
      if (JSON.stringify(this.sideList) != JSON.stringify(rootMenu.children)) {
        this.sideList = rootMenu.children;
      }
    },

    // 判断两个列表是否相同


  }
}
</script>
<style lang="scss" scoped>
.com-aside-wp {
  min-height: 100%;
  background: #F2EEE3;
  border-right: 1px solid #d6d5d1;

  .sort-list {
    display: flex;
    justify-content: center;
    li {
      flex: 1;
    }

    .sort-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 15px;
      height: 80px;
      box-sizing: border-box;
    }
    i {
      width: 25px;
      height: 25px;
      background: green;
    }
    .name {
      margin-top: 15px;
      line-height: 1;
    }
  }

  .this-menu {
    border-right: none;
  }

}
</style>