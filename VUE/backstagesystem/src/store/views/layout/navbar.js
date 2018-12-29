const types = {
	CRUMBS: 'NAVBAR_CRUMBS'
}

const state = {
	crumbs: []
}


const getters = {
	[types.CRUMBS] (state) {
		return state.crumbs;
	}
}

const mutations = {
	[types.CRUMBS] (state, data) {
		state.crumbs = data;
	}
}

const actions = {

}

export default {
	state,
	getters,
	mutations,
	actions
}