<template>
	<div class="site-wrapper site-page--login">
		<div class="login-box">
			<div class="site-content">
				<div class="brand-info">
					<h2 class="brand-info__text">基础服务平台</h2>
					<p class="brand-info__intro">引领大健康新模式 打造战略定位大方向</p>
				</div>
				<div class="login-main">
					<h3 class="login-title">账号登录</h3>
					<el-form :model="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
						<el-form-item prop="userName">
							<el-input id="userName" v-model.trim="dataForm.userName" placeholder="帐号" maxlength="16"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input id="password" v-model.trim="dataForm.password" type="password" maxlength="20" placeholder="密码"></el-input>
						</el-form-item>
						<el-form-item>
							<div class="code-box clear">
								<el-input class="code-ipt pull-left" v-model.trim="dataForm.code" maxlength="10" placeholder="验证码"></el-input>
								<canvas class="code-img pull-left" ref="code" @click="setDrawCode">对不起，您的浏览器不支持canvas，请下载最新版浏览器!</canvas>
							</div>
						</el-form-item>
						<el-form-item>
							<el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { user } from '@/config/api'
export default {
	data() {
		return {
			dataForm: {
				userName: '',
				password: '',
				code: '',
			},
			captchaPath: '',

			show_num: [], // 验证码值
		}
	},
	mounted () {
		this.setDrawCode();
	},
	methods: {
		// 提交表单
		dataFormSubmit() {
      this.$router.push({path: '/home'});
		},

		//生成验证图片
    setDrawCode () {
      this.drawCode({
        obj: this.$refs.code,
        width: 95,
        height: 40,
        show_num: this.show_num
      });
    },

    /*
    作用：生产验证码
    参数：obj->dom对象，width->宽度， height->高度，show_num->用来保存验证码的数组
    */
    drawCode ({obj, width, height, show_num}) {
      var canvas_width=width;
      var canvas_height=height;
      var canvas = obj;
      var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
      var aCode = sCode.split(",");
      var aLength = aCode.length;//获取到数组的长度
      
      for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
        // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var deg = Math.random() - 0.5; //产生一个随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt.toLowerCase();
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = this.randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
      }
      for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = this.randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
      }
      for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = this.randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
    },

    // 随机颜色
    randomColor: function () {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },

    reset () {
    	this.dataForm.userName = '';
    	this.dataForm.password = '';
    	this.dataForm.code = '';
    	this.setDrawCode();
    },

	}
}
</script>

<style lang="scss">
.site-wrapper.site-page--login {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(38, 50, 56, .6);
	overflow: hidden;
	&:before {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		content: "";
		background-image: url(../../assets/image/login_bg.jpg);
		background-size: cover;
	}
	.login-box {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	.site-content {
		min-height: 100%;
		padding: 30px 500px 30px 30px;
	}
	.brand-info {
		margin: 220px 100px 0 90px;
		color: #fff;
	}
	.brand-info__text {
		margin: 0 0 22px 0;
		font-size: 48px;
		font-weight: 400;
		text-transform: uppercase;
	}
	.brand-info__intro {
		margin: 10px 0;
		font-size: 16px;
		line-height: 1.58;
		opacity: .6;
	}
	.login-main {
		position: absolute;
		top: 0;
		right: 0;
		padding: 150px 60px 180px;
		width: 470px;
		min-height: 100%;
		background-color: #fff;
	}
	.login-title {
		font-size: 16px;
	}
	.login-captcha {
		overflow: hidden;
		>img {
			width: 100%;
			cursor: pointer;
		}
	}
	.login-btn-submit {
		width: 100%;
		margin-top: 38px;
	}

	.code-box {
		.code-ipt {
			width: 170px;
		}
		.code-img {
			margin-left: 10px;
			width: 95px;
			height: 40px;
		}
	}
}
</style>