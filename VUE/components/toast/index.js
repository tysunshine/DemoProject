import Vue from "vue"; // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import Main from "./index.vue"; // 引入刚才的 toast 组件
 
let ToastConstructor = Vue.extend(Main); // 这个在前面的前置知识内容里面有讲到
let instance;
let config = {
	msg: '',
	type: 'info',
	position: 'center'
}

const Toast = function(o) {
	showToast(o);
};

Toast.info = function (msg, position) {
	showToast({
		msg: msg,
		position: position,
		type: 'info'
	})
}

Toast.success = function (msg, position) {
	showToast({
		msg: msg,
		position: position,
		type: 'success'
	})
}

Toast.error = function (msg, position) {
	showToast({
		msg: msg,
		position: position,
		type: 'error'
	})
}

Toast.warning = function (msg, position) {
	showToast({
		msg: msg,
		position: position,
		type: 'warning'
	})
}

function showToast (o) {
	if (typeof o == 'string') {
		config.msg = o;
		config.type = 'info';
		config.position = 'center';
	} else if (typeof o == 'object') {
		config.msg = o.msg || '';
		config.type = o.type || 'info';
		config.position = o.position || 'center';
	}

	var vm = new ToastConstructor();
	vm.config = config;
	instance = vm.$mount(); // 渲染组件
	document.body.appendChild(instance.$el); // 挂载到 body 下
}

export default Toast;