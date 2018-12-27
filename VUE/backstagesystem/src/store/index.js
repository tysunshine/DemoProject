import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import sidebar from './views/layout/sidebar.js'

var store = new Vuex.Store({
	modules: {
		sidebar
	}
})

export default store;