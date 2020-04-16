(function (window, document) {
	var tools = {

		/**
		 *@加载中
		 */
		showLoading: function (text) {
			text = '正在加载中..';

			$('#loading .text').text(text);
			$('#loading').fadeIn(300);
		},
		closeLoading: function () {
			$('#loading').fadeOut(300);
		},
	}

	window.tools = tools;
})(window, document);

	