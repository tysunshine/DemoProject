var tools = {
	
	/**
	 * 存储localStorage
	 */
	setStore (name, data) {
		if (!name) return;
		if (typeof data !== 'string') {
			data = JSON.stringify(data);
		}
		window.localStorage.setItem(name, data);
	},

	/**
	 * 获取localStorage
	 */
	getStore (name) {
		if (!name) return;
		var value = window.localStorage.getItem(name);
	    if (value !== null) {
	        try {
	            value = JSON.parse(value);
	        } catch (e) {
	            value = value;
	        }
	    }
	    return value;
	},

	/**
	 * 删除localStorage
	 */
	removeStore (name) {
		if (!name) return;
		window.localStorage.removeItem(name);
	},

	/**
	 * 根据componentPath加载组件
	 */
	getRoutes (menu) {
		var rootRoute = '';
		if ( !menu || menu.length <= 0 ) {
			return [];
		}

		for ( var i = 0; i < menu.length; i++ ) {
			var item = menu[i];
			item.component = () => import(`@/views${item.componentPath}`);

			if ( item.children && item.children.length > 0 ) {
				item.children = this.getRoutes(item.children);
			}
		}
		return menu;
	},

	/**
	 * 生成权限数组
	 */
	getRootList (menu, isChild) {
		var rootList = [];
		if ( !isChild ) {
			rootList = ['/', '/404'];
		}
		if ( !menu || menu.length <= 0 ) {
			return rootList;
		}
		for (var i = 0; i < menu.length; i++ ) {
			var item = menu[i];
			if ( item.children && item.children.length > 0 ) {
				rootList = rootList.concat(this.getRootList(item.children, true));
			} else {
				rootList.push(item.path);
			}
		}
		return rootList;
	}
}

export default tools;