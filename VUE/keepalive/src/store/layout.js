
var state = {
	// 缓存页面列表
	keepList: [],
	exclude: [],
}

var getters = {
    keepList (state) {
        return state.keepList;
    },
    exclude (state) {
    	return state.exclude;
    }
}

var mutations = {
	/**
	 *添加删除路由
	 *args[0]，开始下标
	 *args[1]，删除的个数
	 *args[2,3,4]，要添加的内容
	 */
    keepList (state, data) {
      state.keepList.splice.apply(state.keepList, data);
    },

    pathChange (state, data) {
    	for (var i = 0; i < state.keepList.length; i++) {
        var item = state.keepList[i];
        if (data.path == item.path.split('?')[0]) {
        	if (data.fullPath != item.path) {
		        state.exclude.push(data.name);
		        setTimeout(() => {
		        	state.exclude = [];
		        }, 30);
        	}
          break;
        }
      }
      if (i >= state.keepList.length) {
      	state.keepList.splice(state.keepList.length, 0, {
          path: data.fullPath,
          name: data.name,
          text: data.meta.text
        });
      }
      console.log('1');
    }
}

export default {
	state,
    getters,
    mutations
}