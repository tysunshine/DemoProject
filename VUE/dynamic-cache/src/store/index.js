import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	cachePage: [], // 缓存页面 -- 注意存的是页面里面的name
    isCachePage: [], // 缓存页面需要缓存的具体页面
  },
  getters: {
  	getCachePage (state) {
  		return state.cachePage;
  	},
    getIsCachePage (state) {
      return state.isCachePage;
    },
  },
  mutations: {
    /*data.
    type: 'del'删除，'add'或不传为添加
    name: 组件name
    cache: meta.cache
    */
    setIsCachePage (state, data) {
      var cachePage = state.cachePage;
      var idx = cachePage.indexOf(data.name);

      if (data.type == 'del') {
        if (idx != -1) {
          state.cachePage.splice(idx, 1);
          state.isCachePage.splice(idx, 1);
        }

      } else if ((!data.type || data.type == 'add') && idx == -1) {
        state.cachePage.push(data.name);
        state.isCachePage.push(data.cache);
      }
    },

  },
  actions: {
  },
  modules: {
  }
})
