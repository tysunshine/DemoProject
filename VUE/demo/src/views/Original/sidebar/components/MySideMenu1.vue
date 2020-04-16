<!-- 我的导航栏 -->
<template>
	<div class="my-side-menu-wp" id="mySideMenuWp">
		<!-- <ul class="my-side-list">
			<li class="text-item">
				<a class="text active" href="#" style="padding-left: 24px;">
					<i class="icon1 icon iconfont icon-ziyuan"></i>
					<span>首页</span>
				</a>
			</li>
			<li class="group-item">
				<div class="text">
					<i class="icon1 icon iconfont icon-ziyuan"></i>
					<span>基础管理</span>
					<i class="icon2 icon iconfont icon-xia"></i>
				</div>
				<ul class="my-side-list">
					<li class="text-item">
						<a class="text" href="#" style="padding-left: 48px;">环境管理</a>
					</li>
					<li class="group-item">
						<div class="text" style="padding-left: 48px;">
							<span>区划管理</span>
							<i class="icon2 icon iconfont icon-xia"></i>
						</div>
						<ul class="my-side-list">
							<li class="text-item">
								<a class="text" href="#" style="padding-left: 58px;">区县管理</a>
							</li>
							<li class="group-item">
								<a class="text" href="#" style="padding-left: 58px;">镇乡管理</a>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul> -->
	</div>
</template>
<script>

import $ from '@/assets/js/jquery-1.11.3.min.js';
import '../assets/font/iconfont.css';

export default {
	name: 'MySideMenu',
	data () {
		return {
			dom: null, // 
			// path: '/dashboard/analysis'
			path: '/jcgl/envmanage',
			light: '/jcgl/taskmanage',

		}
	},
	props: ['menus'],
	mounted () {
		this.init();
	},

	methods: {
		// 初始化导航栏
		init () {
			this.dom = $('#mySideMenuWp');
			this.dom.html(this.getHtml());

			this.initEvent();
		},

		initEvent () {
			var _this = this;
			this.dom.on('click', '.group-item > .text', function (event) {
				var parent = $(this).parent();
				var oList = $(this).next();
				var oGroups = parent.parent().children('.group-item');

				for (var i = 0; i < oGroups.length; i++) {
					var oItem = $(oGroups[i]);
					if (oItem != parent && oItem.hasClass('open')) {
						(function (oItem) {
							oItem.children('.my-side-list').slideUp(100, function () {
								oItem.removeClass('open');
								$(this).removeAttr('style');
							})
						})(oItem)
					}
				}
				if (!parent.hasClass('open')) {
					oList.slideDown(100, function () {
						parent.addClass('open');
						$(this).removeAttr('style');
					})
				}
			})

			this.dom.on('click', '.text-item > .text', function () {
				_this.dom.find('.text-item > .text').removeClass('active');
				$(this).addClass('active');
			})
		},

		// 根据menus生成html
		getHtml () {
			var path = this.path; // 当前路由路径
			var light = this.light; // 当前路由指向的高亮菜单路由
			return dg(this.menus, 1);

			// 递归
			function dg (arr, lv) {
				var html = `<ul class="my-side-list">`;
				for (var i = 0; i < arr.length; i++) {
					var item = arr[i];

					// 如果是组
					if (item.children && item.children.length > 0) {
						html += `<li class="group-item${isChildLight(item.children) ? ' open' : ''}">
									<div class="text" style="padding-left: ${calcPLeft(lv)}px;">`;
						if (lv == 1) {
							html += `	<i class="icon1 icon iconfont icon-ziyuan"></i>`;
						}
						html += 		`<span>基础管理</span>
										<i class="icon2 icon iconfont icon-xia"></i>
									</div>`;
						html += dg(item.children, lv + 1);
						html += `</li>`;

					// 如果是按钮
					} else {
						html += `<li class="text-item">
									<a class="text${(item.path == path || item.path == light) ? ' active' : ''}" href="#" style="padding-left: ${calcPLeft(lv)}px;">`;
						if (lv == 1) {
							html += `	<i class="icon1 icon iconfont icon-ziyuan"></i>`;
						}
						html += 		`<span>${item.meta.title}</span>
									</a>
								</li>`;
					}
				}
				html += `</ul>`;
				return html;
			}

			// 计算padding-left
			function calcPLeft (lv) {
				var res = 0;
				if (lv == 1) {
					res = 24;
				} else if (lv == 2) {
					res = 48;
				} else {
					res = 48 + (lv - 2) * 10
				}
				return res;
			}

			// 判断是否有字路由高亮
			function isChildLight (arr) {
				var res = false;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].path == path || arr[i].path == light) {
						res = true;
						break;
					}
					if (arr[i].children && arr[i].children.length > 0) {
						res = isChildLight(arr[i].children);
					}
					if (res) {
						break;
					}
				}
				return res;
			}
		}
	}
}	
</script>
<style lang="scss">
.my-side-menu-wp {

	.my-side-list {
		li {
			margin-bottom: 8px;
			box-sizing: border-box;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.text {
			position: relative;
			display: inline-block;
			padding: 10px 34px 10px 24px;
			width: 100%;
			line-height: 20px;
			box-sizing: border-box;
			cursor: pointer;
			i {
				display: inline-block;
				width: 20px;
				height: 20px;
				text-align: center;
			}
			.icon1 {
				margin-right: 10px;
			}
			.icon2 {
				position: absolute;
				top: 50%;
				right: 13px;
				margin-top: -7px;
				transition: all 0.1s;
			}
			&:hover, &.active {
				color: #1890ff;
			}
			&.active::after {
				content: '';
				display: block;
				position: absolute;
				right: 0;
				top: 0;
				width: 3px;
				height: 40px;
				background: #1890FF;
			}
		}
		& .my-side-list {
			display: none;
			.text {
				padding-right: 16px;
			}
		}
		li.open {
			& > .my-side-list {
				display: block;
			}

			& > .text {
				.icon2 {
					transform: rotate(-180deg);
				}
			}
		}
	}
}
</style>

