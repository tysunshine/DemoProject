
import tools from '@/assets/js/tools.js';

const types = {
	SHOWHEADER: 'LAYOUT_SHOWHEADER',
	SHOWASIDE: 'LAYOUT_SHOWASIDE',
  KEEPLIST: 'LAYOUT_KEEPLIST',
  EXCLUDE: 'LAYOUT_EXCLUDE',
}

var state = {
	showHeader: true, // 是否显示header-页面缓存改变-页面切换也不变化
	showAside: true, // 是否显示侧边栏-页面缓存改变-页面切换也不变化

	// 缓存页面列表
	keepList: [
		{text: '首页', path: '/home', name: 'home'},
	],
	// 不缓存
	exclude: [],

}

var getters = {
    [types.SHOWHEADER] (state) {
        return state.showHeader;
    },
    [types.SHOWASIDE] (state) {
        return state.showAside;
    },
    [types.KEEPLIST] (state) {
        return state.keepList;
    },
    [types.EXCLUDE] (state) {
        return state.exclude;
    },
}

var mutations = {
	// 设置是否显示头部
	[types.SHOWHEADER] (state, data) {
		state.showHeader = data;
	},

	// 设置是否显示侧边栏
	[types.SHOWASIDE] (state, data) {
		state.showAside = data;
	},

	/**
	 *添加删除路由
	 *args[0]，开始下标
	 *args[1]，删除的个数
	 *args[2,3,4]，要添加的内容
	 */
    [types.KEEPLIST] (state, data) {
      // 表示删除
      if (typeof data == 'number') {
        state.keepList.splice(data, 1);
      // route-判断是否添加或者选中
      } else {
        let i;
        for (i = 0; i < state.keepList.length; i++) {
          let item = state.keepList[i];

          // 判断path是否存在
          if (item.path.split('?')[0] == data.fullPath.split('?')[0]) {
            // 已经存在，但参数不对
            if (item.path != data.fullPath) {
            	state.keepList[i].path = data.fullPath;
              state.exclude.push(item.name);
              setTimeout(() => {
              	state.exclude = [];
              }, 30);
            }
            break;
          }
        }
        // 表示不存在-添加
        if (i >= state.keepList.length) {
        	state.keepList.push({
        		path: data.fullPath,
            name: data.name,
            text: tools.menu.current(data.fullPath).name
        	})
        }
      }
    },
}

export default {
	state,
    getters,
    mutations
}