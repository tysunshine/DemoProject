<template>
	<div class="header-nav-box">
		<img class="logo" src="@/assets/img/logo.png"/>
		<h3 class="title">学校后台管理系统</h3>
		<el-dropdown trigger="click" class="user-box" @command="handleCommand">
			<div class="link">
				<span class="name">admin</span>
				<i class="el-icon-caret-bottom"></i>
			</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>修改信息</el-dropdown-item>
				<el-dropdown-item>修改密码</el-dropdown-item>
				<el-dropdown-item command="logoOut">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>
<script>
	import tools from '@/utils/tools'

	export default {
		name: 'headerNav',
		methods: {
			handleCommand (command) {
				switch (command) {
					case 'logoOut': this.logoOut(); break;
				}
			},
			logoOut () {
				tools.removeStore('userinfo');
				tools.removeStore('menuData');
				tools.removeStore('rootList');
				this.$router.replace('/');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.header-nav-box {
		padding: 0 20px;
		width: 100%;
		height: 62px;
		background: #aff;
		box-sizing: border-box;
		border-top: 1px solid #aff;
		border-bottom: 1px solid #7cc;
		&::after {
			content: '';
			display: block;
			clear: both;
		}
		.logo {
			float: left;
			width: 60px;
		}
		.title {
			float: left;
			margin-left: 20px;
			padding-top: 21px;
			font-size: 18px;
			color: #666;
		}
		.user-box {
			float: right;
			position: relative;
			margin-top: 10px;
			border-radius: 4px;
			background: #cff;
			cursor: pointer;
			.link {
				float: left;
				padding: 13px 5px;
				height: 40px;
				line-height: 14px;
				box-sizing: border-box;
				.name {
					float: left;
				}
				i {
					float: left;
					margin-top: 3px;
					margin-left: 5px;
					font-size: 12px;
				}
			}
		}
	}
</style>