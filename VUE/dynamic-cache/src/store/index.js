import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	cachePage: [], // 缓存页面
  },
  getters: {
  	getCachePage (state) {
  		return state.cachePage;
  	}

  },
  mutations: {
  	setCachePage (state, data) {
  		var cachePage = state.cachePage;
  		var idx = cachePage.indexOf(data.path);

  		if (data.type == 'del') {
  			if (idx != -1) {
  				state.cachePage.splice(idx, 0);
  			}

  		} else if (idx == -1) {
  			state.cachePage.push(data.path);
  		}
  	},

  },
  actions: {
  },
  modules: {
  }
})
