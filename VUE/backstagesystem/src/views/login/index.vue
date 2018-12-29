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
	import tools from '@/utils/tools'

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
						path: '',
						useComponent: 'Layout',
						hidden: true,
						meta: {
							text: '首页',
							icon: 'iconfont icon-shouye',
						},
						children: [
							{path: '/index', name: 'index', useComponent: 'index', meta: {text: '首页'}}
						]
					},
					{
						path: '/worker',
						useComponent: 'Layout',
						meta: {
							text: '职工管理',
							icon: 'iconfont icon-huihuilicaishi',
						},
						children: [
							{path: '/workerType', name: 'workerType', useComponent: 'workerType', meta: {text: '职工类别'}},
							{path: '/workerList', name: 'workerList', useComponent: 'workerList', meta: {text: '职工列表'}}
						]
					},
					{
						path: '/student',
						useComponent: 'Layout',
						meta: {
							text: '学生管理',
							icon: 'iconfont icon-xuesheng',
						},
						children: [
							{path: '/studentType', name: 'studentType', useComponent: 'studentType', meta: {text: '学生类别'}},
							{path: '/studentList', name: 'studentList', useComponent: 'studentList', meta: {text: '学生列表', noCaching: true}}
						]
					},
					{
						path: '/college',
						useComponent: 'Layout',
						meta: {
							text: '学院管理',
							icon: 'iconfont icon-xueyuan',
						},
						children: [
							{path: '/collegeList', name: 'collegeList', useComponent: 'collegeList', meta: {text: '学院列表'}}
						]
					}
				]

				// 存储路由数据
				tools.setStore('menuData', JSON.stringify(menuData));
				// 存储权限列表数组，一维数组--_-
				tools.setStore('rootList', JSON.stringify(tools.getRootList(menuData)));

				// 使用getRoutes函数导入component组件到对应的路由
				var routes = tools.getRoutes(menuData);

				// 将路由插入到router中，注：页面刷新时会丢失，所以需要监听beforeEach，在其中重新添加
				this.$router.addRoutes(routes);
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
						if ( this.userInfo.name == '1' && this.userInfo.pwd == '1' ) {
							
							tools.setStore('userinfo', JSON.stringify(this.userInfo));
							this.setMenuData();
						} else {
							this.$notify.error({
								title: '错误',
								message: '请输入正确的账户密码'
							})
						}
					}, 100);
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