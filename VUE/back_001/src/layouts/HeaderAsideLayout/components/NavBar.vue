<template>
	<el-menu class="navbar" mode="horizontal">
		<div class="mbx-list">{{mbxText}}</div>

		<div class="user-profile-container" trigger="click">
			<div class="user-profile-content">
				<div class="head-box">
					<div class="user-profile-body">
						<span class="clearfix" style="outline:medium;">
							<img class="user-avatar user-avatars pull-left" src="../../../assets/image/icon_personal@2x.png">
							<span class="user-name pull-left" v-if="userMsg">{{userMsg.hospitalName}}</span>
						</span>
					</div>
					<div class="user-profile-body" @click="signOut()">
						<img class="user-avatar" src="../../../assets/image/icon_log_out@2x.png">
						<span class="user-name">退出</span>
					</div>
				</div>
			</div>
		</div>
	</el-menu>
</template>

<script>
	import Bus from '@/utils/bus';
	import { user } from '@/utils/api';
	import {asideMenuConfig} from '@/config/menu';

	export default {
		name: 'NavBar',
		data() {
			return {
				dialogVisible: false,
				pwdFrom:{
					pass:'',
					newPass:'',
					newPass1:'',
				},//修改密码参数
			}
		},
		computed: {
			mbxText () {
				var aText = [];
				var route = this.$route;
				var aPath = route.path.split('\/');
				aPath.shift();

				ergodic(asideMenuConfig, 0); // 从左侧菜单列表中查找当前路由的面包屑
				return aText.join('-');

				// 遍历
				function ergodic (arr, aIdx) {
					for (var i = 0; i < arr.length; i++) {
						var item = arr[i];
						if (item.path == '/'+aPath[aIdx]) {
							aText.push(item.name);

							// 是否已经显示完
							if (aIdx < aPath.length - 1) {
								// 是否还存在于左侧菜单
								if (item.children) {
									ergodic(item.children, aIdx+1);
								} else {
									if (route.meta.mbx) {
										aText.push(route.meta.mbx);
									}
								}
							}
							break;
						}
					}
				}
			}
		},
		created (){
			this.infoMsg();
		},
		mounted () {
			Bus.$on('userMsg',val=>{//监听first组件的txt事件
				this.userMsg = val;
			});	
		},
		methods: {
			goRouter(){
				this.$router.push({path:'/'});
			},

			signOut() {
				// this.eGet(user.loginOut,{},(res)=>{
				// 	if(res.result == 200){
				// 		this.removeCookie("info");//删除登录人信息，并推出登录
				// 	}
				// })
				this.$router.push('/login');
			}
		},
	};
</script>

<style lang="scss" scoped>
	.muen-index{
		width: 80px;
		height: 64px;
		line-height: 64px;
		float: left;
		cursor: pointer;
		text-align: center;
	}
	.is-index{
		border-bottom: 2px solid #409eff;
	}
	.navbar {
		position: relative;
		height: 64px;
		box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

		/*面包屑列表*/
		.mbx-list {
			position: absolute;
			left: 20px;
			top: 50%;
			margin-top: -15px;
			line-height: 30px;
			color: #333;
		}

		.user-profile-container {
			position: absolute;
			right: 20px;
			cursor: pointer;
			.user-profile-content {
				display: flex;
				/*padding: 20px 0;*/
			}
			.menu-icons {
				display: flex;
				align-items: center;
				.menu-icon {
					padding: 0 12px;
					.icon {
						display: inline-block;
						font-size: 18px;
						text-align: center;
					}
				}
			}
			.head-box {
				display: flex;
				height: 64px;
				align-items: center;
			}
			.user-profile-body {
				position: relative;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				text-align: center;
				padding-right: 14px;
			}
			.user-avatar {
				width: 22px;
				height: 22px;
				margin: 0 8px 0 12px;
				border-radius: 4px;
			}
			.user-name {
				font-size: 15px;
				color: rgba(0, 0, 0, .65);
			}
			.user-department {
				font-size: 12px;
				color: rgba(102, 102, 102, 0.65);
			}
			.el-icon-caret-bottom {
				position: absolute;
				right: 0;
				top: 13px;
				font-size: 12px;
			}
		}
	}
</style>