const types = {
	ISCOLLAPSE: 'SIDEBAR_ISCOLLAPSE'
}

const state = {
	// 折叠
	isCollapse: false
}


const getters = {
	[types.ISCOLLAPSE] (state) {
		return state.isCollapse;
	}
}

const mutations = {
	[types.ISCOLLAPSE] (state, data) {
		state.isCollapse = data;
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