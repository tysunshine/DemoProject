<!-- 公共头部 -->
<template>
  <div class="com-header-wp">
    
    <img class="logo" src="../assets/image/logo04.png">

    <div class="clearfix">
      <ul class="nav-list pull-left">
        <li v-for="(item, index) in navList" :key="index" :class="{active: isActive(item)}">
          <router-link class="nav-a" :to="item.path || item.redirect">
            <i v-if="item.icon" :class="[item.icon]"></i>
            <span class="name">{{item.name}}</span>
          </router-link>
        </li>
      </ul>
      <div class="box2 pull-left">
        <el-dropdown class="pull-left" placement="bottom">
          <div class="el-dropdown-link">
            <img src="../assets/image/tx0.jpg">
            <div class="right">
              <div class="t1">系统管理员</div>
              <div>
                <span class="t2">张三</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
            </div>
          </div>
          <el-dropdown-menu class="header-user-dropdown" slot="dropdown">
            <el-dropdown-item command="1">
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item command="2">
              <span @click="logout()">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> 
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'com-header',
  data () {
    return {
      navList: this.$tools.menu.list(),
    }
  },
  mounted () {

  },
  methods: {
    // 退出登录
    logout () {
      this.$tools.logout();
    },

    // 判断是否选中
    isActive (item) {
      var path = this.$tools.excludeEmpty(this.$route.path); // 排除/empty路由
      var root = this.$tools.menu.root(path, 1);
      return root.idxs.join('_') == item.idxs.join('_') ? true : false;
    },

  }
}
</script>
<style lang="scss" scoped>
$height: 62px;

.com-header-wp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  height: $height;
  background: #B07C21 url(../assets/image/top-bk2.png);
  .logo {
    margin-left: 30px;
    height: 46px;
  }

  .nav-list {
    li {
      float: left;
      min-width: 74px;
      &.active {
        background: #A97722;
      }
    }
    .nav-a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      height: $height;
      text-align: center;
      box-sizing: border-box;
      color: #fff;

      i {
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        font-size: 24px;
      }
      .name {
        margin-top: 10px;
        line-height: 1;
      }
    }
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
    padding: 0 30px 0 15px;
    height: $height;
    background: #A97722;
    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
    .right {
      flex: 1;
      padding-left: 15px;
      box-sizing: border-box;
      color: #fff;
      .t1 {
        font-size: 14px;
      }
      .t2 {
        font-size: 12px;
      }
    }
  }

}
</style>
<style lang="scss">
.header-user-dropdown {
  .el-dropdown-menu__item {
    padding: 0;
    span {
      display: inline-block;
      padding: 0 20px;
    }
  }
}
</style>

