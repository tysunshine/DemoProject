export const menus = [{
	"redirect": null,
	"path": "/dashboard/analysis",
	"component": "dashboard/Analysis",
	"route": "1",
	"meta": {
		"keepAlive": false,
		"internalOrExternal": false,
		"icon": "home",
		"title": "首页"
	},
	"name": "dashboard-analysis",
	"id": "9502685863ab87f0ad1134142788a385"
}, {
	"redirect": null,
	"path": "/online",
	"component": "layouts/RouteView",
	"route": "1",
	"children": [{
		"path": "/online/copyform/:code",
		"component": "modules/online/cgform/OnlCgformCopyList",
		"route": "1",
		"hidden": true,
		"meta": {
			"keepAlive": false,
			"internalOrExternal": false,
			"title": "AUTO复制表单"
		},
		"name": "online-copyform-@code",
		"id": "f2849d3814fc97993bfc519ae6bbf049"
	}, {
		"path": "/online/cgformErpList/:code",
		"component": "modules/online/cgform/auto/erp/OnlCgformErpList",
		"route": "1",
		"hidden": true,
		"meta": {
			"keepAlive": false,
			"internalOrExternal": false,
			"title": "AUTO在线表单ERP"
		},
		"name": "online-cgformErpList-@code",
		"id": "1229674163694841857"
	}, {
		"path": "/online/cgreport/:code",
		"component": "modules/online/cgreport/auto/OnlCgreportAutoList",
		"route": "1",
		"hidden": true,
		"meta": {
			"keepAlive": false,
			"internalOrExternal": false,
			"title": "AUTO在线报表"
		},
		"name": "onlineAutoList",
		"id": "9fe26464838de2ea5e90f2367e35efa0"
	}, {
		"path": "/online/cgformTreeList/:code",
		"component": "modules/online/cgform/auto/OnlCgformTreeList",
		"route": "1",
		"hidden": true,
		"meta": {
			"keepAlive": false,
			"internalOrExternal": false,
			"title": "AUTO树表单列表"
		},
		"name": "online-cgformTreeList-@code",
		"id": "fba41089766888023411a978d13c0aa4"
	}, {
		"path": "/online/cgformList/:code",
		"component": "modules/online/cgform/auto/OnlCgformAutoList",
		"route": "1",
		"hidden": true,
		"meta": {
			"keepAlive": false,
			"internalOrExternal": false,
			"title": "AUTO在线表单"
		},
		"name": "online-cgformList-@code",
		"id": "54097c6a3cf50fad0793a34beff1efdf"
	}],
	"meta": {
		"keepAlive": false,
		"internalOrExternal": false,
		"icon": "cloud",
		"title": "在线开发"
	},
	"name": "online",
	"id": "e41b69c57a941a3bbcce45032fe57605",
	"hidden": true
}, {
	"redirect": null,
	"path": "/ywgl",
	"component": "layouts/RouteView",
	"route": "1",
	"children": [{
		"path": "/ywgl/taskmanage",
		"component": "ywgl/TaskManage",
		"route": "1",
		"meta": {
			"keepAlive": false,
			"internalOrExternal": false,
			"title": "任务管理"
		},
		"name": "ywgl-taskmanage",
		"id": "1239470133114703873"
	}, {
		"path": "/ywgl/examine",
		"component": "ywgl/Examine",
		"route": "1",
		"meta": {
			"keepAlive": false,
			"internalOrExternal": false,
			"title": "工作内容审核"
		},
		"name": "ywgl-examine",
		"id": "1242652857749118977"
	}],
	"meta": {
		"keepAlive": false,
		"internalOrExternal": false,
		"icon": "flag",
		"title": "业务管理"
	},
	"name": "ywgl",
	"id": "1239469325304336386"
}, {
	"redirect": null,
	"path": "/jcgl",
	"component": "layouts/RouteView",
	"route": "1",
	"children": [{
		"path": "/jcgl/envmanage",
		"component": "jcgl/EnvManage",
		"route": "1",
		"meta": {
			"keepAlive": false,
			"internalOrExternal": false,
			"title": "环境管理"
		},
		"name": "jcgl-envmanage",
		"id": "1242325207566434305"
	}],
	"meta": {
		"keepAlive": false,
		"internalOrExternal": false,
		"icon": "bars",
		"title": "基础管理"
	},
	"name": "jcgl",
	"id": "1242324747547754498"
}]