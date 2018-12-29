import Components from '../router/Components.js'

var tools = {
	/**
	 * 获取样式
	 */
	getStyle (obj, name) {
	    if(window.getComputedStyle) {
	        return getComputedStyle(obj, null)[name];
	    } else {
	        return obj.currentStyle[name];
	    }
	},

	/**
	 * 设置样式
	 */
	setStyle (obj, oStyle) {
	    for(var i in oStyle) {
	        obj.style[i] = oStyle[i];
	    }
	},
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
			// 使用import引入遇到了子组件内容都是最后一个组件的问题，没解决
			// item.component = () => import(`@/views${item.componentPath}`);
			if ( item.useComponent in Components ) {
				item.component = Components[item.useComponent];
			} else {
				item.component = null;
			}

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
	},

	/**
	 * 生成面包屑数组
	 */
	getTags (menu, path, homePage) {
		var res = [homePage];

		if ( path == homePage.path ) {
			return res;
		}
		for ( var i = 0; i < menu.length; i++ ) {
			var item = menu[i];
			if ( item.path == path ) {
				res.push({
					text: item.meta.text,
					path: item.path
				})
				break;
			}

			if ( item.children && item.children.length > 0 ) {
				var oChild = null;
				for ( var j = 0; j < item.children.length; j++ ) {
					var list = item.children[j];
					if ( list.path == path ) {
						oChild = {
							text: list.meta.text
						}
						break;
					}
				}
				if ( oChild ) {
					res.push({
						text: item.meta.text
					})
					res.push(oChild);
					break;
				}
			}
		}
		return res;
	}
}

export default tools;