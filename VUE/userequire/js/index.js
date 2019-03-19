define(['Vue', "comHeader"], function (Vue, comHeader) {
return function () {


	new Vue({
		el: '#app',
		data: {
			msg: 'Hello'
		},
		components: {
			comHeader
		}
	})

}
})