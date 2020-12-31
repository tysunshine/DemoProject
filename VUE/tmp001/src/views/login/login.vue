<!-- 登陆 -->
<template>
  <div class="login-wp">

    <div class="content y-center">
      <div class="login-box">
        <div class="title">重庆市中医信息管理平台</div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名">
               <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model="form.pwd" type="password" placeholder="请输入密码">
               <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="key">
            <div class="clearfix key-box">
              <el-input class="key-ipt pull-left" v-model="form.key" placeholder="请输入验证码">
                <i slot="prefix" class="el-input__icon el-icon-key"></i>
              </el-input>
              <div class="key-btn pull-right"></div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="row1 clearfix">
              <el-checkbox class="pull-left" v-model="form.checked">记住密码</el-checkbox>
              <router-link class="pull-right" to="/login">忘记密码？</router-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-btn" type="primary" @click="submit()">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>
<script>

import menus from '@/assets/js/menus.js';

export default {
  name: 'login',
  data () {
    return {
      form: {
        name: '',
        pwd: '',
        key: '',
        checked: false,
      },

      // 验证规则
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        key: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },

    }
  },
  mounted () {
    this.setLoginParam(); // 设置登陆初始参数
  },
  methods: {
    // 设置登陆初始参数
    setLoginParam () {
      var param = this.$tools.storage.get('loginParam');
      if (param) {
        this.form.name = param.name;
        this.form.pwd = param.pwd;
        this.form.checked = true;
      }
    },

    // 登录
    submit () {
      this.$refs.form.validate(valid=>{
        if (!valid) {
          return;
        }
        var param = {
          name: this.form.name,
          pwd: this.form.pwd,
          key: this.form.key
        }
        setTimeout(() => {
          // 是否记住密码
          if (this.form.checked) {
            this.$tools.storage.set('loginParam', {
              name: this.form.name,
              pwd: this.form.pwd
            })
          } else {
            this.$tools.storage.remove('loginParam');
          }
          // 保存菜单
          this.$tools.storage.set('menus', this.$tools.menu.setIndex(menus));
          // 跳转首页
          this.$router.push("/home");
        }, 100);

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wp {
  height: 100vh;
  box-sizing: border-box;
  background: #E0D09E;

  .content {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    text-align: center;
  }

  .login-box {
    padding: 40px;
    width: 400px;
    height: 500px;
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    box-sizing: border-box;

    .title {
      margin-bottom: 35px;
      font-size: 24px;
      line-height: 34px;
    }

    .key-box {
      .key-ipt {
        width: 62%;
      }
      .key-btn {
        width: 35%;
        height: 40px;
        background: #eee;
      }
    }

    .row1 {
      line-height: 20px;
    }

    .submit-btn {
      width: 100%;
    }

  }

}
</style>