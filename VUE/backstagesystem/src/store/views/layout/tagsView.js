const types = {
	VISITEDVIEWS: 'TAGSVIEW_VISITEDVIEWS',
	CACHEDVIEWS: 'TAGSVIEW_CACHEDVIEWS'
}

const state = {
	visitedViews: [],
	cachedViews: []
}


const getters = {
	[types.VISITEDVIEWS] (state) {
		return state.visitedViews;
	},

	[types.CACHEDVIEWS] (state) {
		return state.cachedViews;
	}
}

const mutations = {
	['ADD_' + types.VISITEDVIEWS] (state, route) {
		for ( var i = 0; i < state.visitedViews.length; i++ ) {
			if ( route.path == state.visitedViews[i].path ) {
				break;
			}
		}
		if ( i >= state.visitedViews.length ) {
			state.visitedViews.push({
				path: route.path,
				text: route.meta.text,
				name: route.name
			})

			if ( route.name && !route.meta.noCaching ) {
				state.cachedViews.push(route.name);
			}
		}
	},

	['DEL_' + types.VISITEDVIEWS] (state, route) {
		for ( var i = 0; i < state.visitedViews.length; i++ ) {
			if ( route.path == state.visitedViews[i].path ) {
				break;
			}
		}
		if ( i < state.visitedViews.length ) {
			var idx = state.cachedViews.indexOf(state.visitedViews[i].name);
			if ( idx != -1 ) {
				state.cachedViews.splice(idx, 1);
			}
			state.visitedViews.splice(i, 1);
		}
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