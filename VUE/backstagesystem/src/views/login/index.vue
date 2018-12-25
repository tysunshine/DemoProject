<template>
	<div class="login-box">
		<div class="container">
			<h3 class="title">后台管理系统</h3>
			<el-form :ref="refName" :model="userInfo" :rules="rules" label-position="left">
				<el-form-item prop="name">
					<el-input v-model="userInfo.name" prefix-icon="el-icon-goods" placeholder="账号" type="text"></el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input v-model="userInfo.pwd" prefix-icon="el-icon-goods" placeholder="密码" type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="submit-btn" type="primary" :loading="isLoading" @click="onSubmit">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import Layout from '@/views/homepage/index'
	export default {
		name: 'login',
		data () {
			return {
				refName: 'loginRef',
				isLoading: false,
				userInfo: {
					name: '',
					pwd: ''
				},
				rules: {
					name: [
						{required: true, message: '请输入账户', trigger: 'blur'}
					],
					pwd: [
						{required: true, message: '请输入密码', trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			setMenuData () {
				var menuData = [
					{
						path: '/index',
						component: Layout,
						text: '首页',
						children: [
							{path: '/', component: () => import('@/views/homepage/index'), text: '首页'}
						]
					},
					{
						path: '/worker',
						component: Layout,
						text: '职工管理',
						children: [
							{path: '/type', component: () => import('@/views/workersSystem/workerType'), text: '职工类别'}
						]
					},
					{
						path: '/student',
						component: Layout,
						text: '学生管理',
						children: [
							{path: '/type', component: () => import('@/views/studentSystem/studentType'), text: '学生类别'}
						]
					}
				]

				window.localStorage.setItem('menuData', JSON.stringify(menuData));
				this.$router.addRoutes(menuData);
				this.$router.push('/index');
			},
			onSubmit () {
				this.$refs[this.refName].validate((valid) => {
					if ( !valid ) {
						return;
					}
					this.isLoading = true;
					setTimeout(() => {
						this.isLoading = false;
						if ( this.userInfo.name == 'admin' && this.userInfo.pwd == '123456' ) {
							this.setMenuData();
						} else {
							this.$notify.error({
								title: '错误',
								message: '请输入正确的账户密码'
							})
						}
					}, 1000);
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.login-box {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: #aff;
		.container {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -220px;
			margin-left: -120px;
			padding: 20px;
			width: 240px;
			height: 340px;
			background: #fff;
			border-radius: 3px;
			.title {
				margin-bottom: 40px;
				font-size: 24px;
				text-align: center;
			}
			.submit-btn {
				display: block;
				margin: 30px auto 0;
				width: 100%;
			}
		}
	}
</style>