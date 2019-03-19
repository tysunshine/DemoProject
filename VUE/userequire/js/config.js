require.config({
	baseUrl: "../js",
	paths: {
		// 依赖库
		"Vue": "../lib/vue",
			
		// 组件
		"comHeader": "../components/header",

		// 逻辑文件
		"index": "index",
	}
})

var page = document.querySelector('[data-page]').getAttribute('data-page');
require([page], function (page) {
	page();
})