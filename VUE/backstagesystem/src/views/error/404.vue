<template>
	<div class="error-404-box">
		<div class="container">
			<img class="img-404" src="@/img/404.png">
			<div class="msg">
				<h2>404!</h2>
				<h3>网管说这个页面你不能进......</h3>
				<p>请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</p>
				<!-- <router-link class="goBack" to="/index">返回首页</router-link> -->
				<a class="goBack" href="/index">返回首页</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'error404'
	}
</script>
<style lang="scss" scoped>
	.error-404-box {
		position: relative;
		height: 100%;
		.container {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -500px;
			margin-top: -200px;
			width: 1000px;
			&::after {
				content: '';
				display: block;
				clear: both;
			}
			.img-404 {
				float: left;
				width: 50%;
			}
			.msg {
				float: left;
				padding: 30px 0;
				width: 300px;
				h2 {
					margin-bottom: 30px;
					font-size: 32px;
					line-height: 40px;
					color: #1482f0;
					font-weight: bold;
				}
				h3 {
					margin-bottom: 20px;
					font-size: 20px;
					line-height: 24px;
					font-weight: bold;
					color: #222;
				}
				p {
					margin-bottom: 40px;
					font-size: 13px;
					line-height: 21px;
					color: grey;
				}
				.go-index-btn {
					padding-left: 25px;
					padding-right: 25px;
				}
				.goBack {
					padding: 6px 25px;
					border: 1px solid #409EFF;
					background: #409EFF;
					color: #fff;
					line-height: 1;
					font-size: 14px;
					border-radius: 20px;
				}
			}
		}
	}
</style>