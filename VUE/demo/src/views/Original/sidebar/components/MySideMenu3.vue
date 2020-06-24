<!-- 隐藏-显示文本 -->
<!-- <template>
	<div class="my-side-menu-wp" id="mySideMenuWp">
		<ul class="my-side-list">
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
		</ul>
	</div>
</template> -->
<script>

import $ from '@/assets/js/jquery-1.11.3.min.js';
import '../assets/font/iconfont.css';

export default {
	name: 'comHeader',
	data () {
		return {
			path: '/jcgl/envmanage', // 当前路由路径 在实际中为 $route.path
			light: '/jcgl/taskmanage', // 当前路由指向的高亮菜单路由 在实际中为 $route.meta.light -自定义

			oDom: null,
		}
	},
	props: [
		'menus',
		'collapsed',
	],
	watch: {
		collapsed (val) {
			if (val) {
				this.oDom.addClass('collapsed');
				this.oDom.addClass('hide');
			} else {
				this.oDom.removeClass('collapsed');
				setTimeout(() => {
					this.oDom.removeClass('hide');
				}, 200);
			}
		}
	},
	mounted () {
		this.oDom = $('#mySideMenuWpRender3');

		this.initEvent();
	},
	methods: {
		initEvent () {
			var _this = this;
			var oDom = this.oDom;

			// 组点击
			oDom.on('click', '.group-item > .text', function (event) {
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

			// 文本点击
			oDom.on('click', '.text-item > .text', function (event) {
				event.preventDefault();
				oDom.find('.text-item > .text').removeClass('active');
				$(this).addClass('active');
				// _this.$router.push($(this).attr('href'));
			})
		}
	},
	render: function (c) {
		var path = this.path; // 当前路由路径
		var light = this.light; // 当前路由指向的高亮菜单路由

		return c('div', {
			class: {
				'my-side-menu-wp': true
			},
			attrs: {
				id: 'mySideMenuWpRender3'
			}
		}, [getRoot(this.menus, 0)])

		// 根组
		function getRoot (aMenus, lv) {
			var children = [];

			for (var i = 0; i < aMenus.length; i++) {
				var item = aMenus[i];

				if (item.children && item.children.length > 0) {
					children.push(getGroupItem(item, lv+1));
				} else {
					children.push(getTextItem(item, lv+1));
				}

			}

			return c('ul', {
				class: {
					'my-side-list': true
				}
			}, children);
		}

		// 文本按钮项
		function getTextItem (item, lv) {
			var children = [];
			// 一级目录显示icon
			if (lv == 1) {
				children.push(c('i', {
					class: {
						'icon1': true,
						'icon iconfont icon-ziyuan': true
					}
				}))
			}
			children.push(c('span', {
				domProps: {
					innerHTML: item.meta.title
				}
			}))

			return c('li', {
				class: {
					'text-item': true
				}
			}, [
				c('a', {
					class: {
						'text': true,
						'active': item.path ==  path || item.path == light
					},
					style: {
						'padding-left': calcPLeft(lv) + 'px'
					},
					attrs: {
						href: item.path
					}
				}, children)
			])
		}

		// 目录组项
		function getGroupItem (item, lv) {
			var children = [];

			// 一级目录显示icon
			if (lv == 1) {
				children.push(c('i', {
					class: {
						'icon1': true,
						'icon iconfont icon-ziyuan': true
					}
				}));
			}
			children.push(c('span', {
				domProps: {
					innerHTML: item.meta.title
				}
			}))
			children.push(c('i', {
				class: {
					'icon2': true,
					'icon iconfont icon-xia': true
				}
			}))

			return c('li', {
				class: {
					'group-item': true,
					'open': isChildLight(item.children)
				}
			}, [
				c('div', {
					class: {
						'text': true
					},
					style: {
						'padding-left': calcPLeft(lv) + 'px'
					}
				}, children),
				getRoot(item.children, lv)
			])
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
</script>
<style lang="scss" scoped>
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
			color: #666;
			text-decoration: none;
			transition: all .1s;
			i {
				display: inline-block;
				width: 20px;
				height: 20px;
				text-align: center;
			}
			.icon1 {
				margin-right: 10px;
				transition: all .1s;
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
.my-side-menu-wp.collapsed {
	& > .my-side-list {
		& > li {
			& > .text {
				padding-left: 30px !important;
				.icon1 {
					font-size: 18px;
				}
			}
		}
	}
}
.my-side-menu-wp.hide {
	& > .my-side-list {
		& > li {
			position: relative;
			& > .text {
				padding-right: 0;
				span {
					display: none;
				}
				.icon2 {
					display: none;
				}
			}
			&.text-item {
				& > .text {
					&:hover span {
						display: block;
					}
					span {
						display: none;
						position: absolute;
						left: 84px;
						top: 50%;
						margin-top: -15px;
						padding-left: 10px;
						padding-right: 20px;
						white-space: nowrap;
						height: 30px;
						background: rgba(0, 0, 0, 0.5);
						color: #fff;
						line-height: 30px;
						border-radius: 3px;

						&:before {
							content: '';
							position: absolute;
							top: 0;
							bottom: 0;
							left: -5px;
							width: 6px;
						}
					}
				}
			}

			&:hover > .my-side-list {
				display: block;
			}
			& > .my-side-list {
				display: none;
				position: absolute;
				left: 84px;
				top: 0;
				width: 150px;
				background: #fff;
				border-radius: 3px;
				.text {
					padding-left: 10px !important;
					background: #fff;
				}
				&:before {
					content: '';
					position: absolute;
					top: 0;
					bottom: 0;
					left: -5px;
					width: 6px;
				}
				.text:after {
					display: none;
				}
			}
		}
	}
}
</style>