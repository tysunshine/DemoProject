import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import sidebar from './views/layout/sidebar.js'
import navbar from './views/layout/navbar.js'
import tagsView from './views/layout/tagsView.js'

var store = new Vuex.Store({
	modules: {
		sidebar,
		navbar,
		tagsView
	}
})

export default store;