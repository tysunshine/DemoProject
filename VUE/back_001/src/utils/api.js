// 数据请求接口

// const env = "online"; // 打包
const env = "test"; // 测试

const host = {
	online: {
		pubUserURL: '/api/dataCoordinate', // 用户管理,事前提醒正式
		pubMoniter: '/api/monitor', // 监控
	},
	test: {
		pubUserURL: 'http://172.30.34.4:8097/api/dataCoordinate', // 用户管理,事前提醒正式
		pubMoniter: 'http://172.30.34.4:18888/api/monitor', // 监控
	},
}

// 用户管理
export const user = {
	getAreaTreeList: host[env].pubUserURL + '/basedata/area/getAreaTreeList',//获取区域列表
	getAreaList: host[env].pubUserURL + '/basedata/area/getAreaList',//获取区域列表
	areaList: host[env].pubUserURL + '/basedata/area/list',//获取区域列表
	getAreaTreeLists: host[env].pubUserURL + '/tableStatistical/getAreaTreeList', // 事中接口获取地址列表
	findAllOrg: host[env].pubUserURL + '/notify/findAllOrg',//获取医院列表

	unlock: host[env].pubUserURL + '/basedata/user/unlock',//解锁角色信息

	firstUpdatePwd: host[env].pubUserURL + '/basedata/user/fristlogin/updatePwd',//第一次登陆时，修改密码
	updatePwd: host[env].pubUserURL + '/basedata/user/updatePwd',//修改登录密码
	login: host[env].pubUserURL + '/basedata/user/login',//用户登录
	loginOut: host[env].pubUserURL + '/basedata/user/loginOut',//退出登录
}

// 首页统计
export const monitor = {
	dataPipeMonitor: host[env].pubUserURL + '/dataPipeMonitor/list',// 数据管道列表
	getRadarMapData: host[env].pubUserURL + '/qualityControl/getRadarMapData',// 获取雷达图数据
	regionalMonitoring: host[env].pubUserURL + '/statisticsNoLogin/regionalMonitoring',// 获取雷达图数据
	regionalOrgMonitoring: host[env].pubUserURL + '/statisticsNoLogin/regionalOrgMonitoring',//实时监控各医院数据
	uploadAmount: host[env].pubUserURL + '/tableupload/uploadAmount',//实时监控各区域数据
}

// 基础数据管理
export const base = {
	orgCondition: host[env].pubUserURL + '/basedata/org/condition',//获取机构列表数据
	deptList: host[env].pubUserURL + '/basedata/dept/list',//获取部门列表数据
	empList: host[env].pubUserURL + '/staff/info/page',//获取人员列表数据

	areaList: host[env].pubUserURL + '/basedata/area/findAll',//获取区域列表数据
	areaDelete: host[env].pubUserURL + '/basedata/area/deleteBaArea',//删除区域数据
	saveBaArea: host[env].pubUserURL + '/basedata/area/saveBaArea',//新增、修改区域数据
	findAreaByLevels: host[env].pubUserURL + '/basedata/area/findAreaByLevels',//区域类别数据
}

// 日志管理
export const journal = {
	list: host[env].pubUserURL + '/basedata/log/pagelist',//日志管理
}

// 字典管理
export const dict = {
	list: host[env].pubUserURL + '/basedata/dict/findAll',//获取字典列表数据
	delete: host[env].pubUserURL + '/basedata/dict/deleteDict',//删除字典数据
	saveDict: host[env].pubUserURL + '/basedata/dict/saveDict',//保存字典数据

	tree: host[env].pubUserURL + '/basedata/dict/findDictTpyeTree',//字典类别树
	typeDel: host[env].pubUserURL + '/basedata/dict/deleteDictType',//删除字典类别数据
	typeSave: host[env].pubUserURL + '/basedata/dict/saveDictType',//保存字典类别数据
}

// 数据管理
export const dataApi = {
	synLog: host[env].pubUserURL + '/operat/manage/data/syn/log',// 日志列表

	quotaCalcList: host[env].pubUserURL + '/basedata/calculatelog/pagelist',//指标计算日志
}

// 卫生活动管理
export const system = {
	userDel: host[env].pubUserURL + '/basedata/user/removeById',//删除用户信息
	userSave: host[env].pubUserURL + '/basedata/user/saveUser',//新增修改用户信息
	userAll: host[env].pubUserURL + '/basedata/user/findAll',//查询所有用户列表
	userResetPwd: host[env].pubUserURL + '/basedata/user/resetPwd',//重置用户密码

	roleDel: host[env].pubUserURL + '/basedata/role/removeById',//删除角色信息
	roleSave: host[env].pubUserURL + '/basedata/role/saveRole',//新增修改角色信息
	roleAll: host[env].pubUserURL + '/basedata/role/findAll',//查询所有角色列表
	roleResource: host[env].pubUserURL + '/basedata/resource/getListResourceByRoleId',//根据角色查询菜单列表
	saveRoleResource: host[env].pubUserURL + '/basedata/resource/saveRoleResource',//根据角色绑定菜单列表

	dictList: host[env].pubUserURL + '/basedata/dict/list',// 获取签发正机关
}

// 指标配置管理
export const resource = {
	list: host[env].pubUserURL + '/basedata/resource/findAll',//查询所有菜单列表
	save: host[env].pubUserURL + '/basedata/resource/saveResource',//新增修改菜单信息
	remove: host[env].pubUserURL + '/basedata/resource/removeById',//删除菜单信息
}

// 活动目录管理
export const activity = {
	tree: host[env].pubUserURL + '/activities/catalog/tree',// 活动目录管理<树状结构>
	save: host[env].pubUserURL + '/activities/catalog/save',//保存活动目录管理
	delete: host[env].pubUserURL + '/activities/catalog/delete/',//删除活动目录管理
}

// 摘要配置管理
export const digest = {
	list: host[env].pubUserURL + '/activities/digest/page',// 摘要配置管理查询<分页>
	save: host[env].pubUserURL + '/activities/digest/save',// 保存摘要配置管理
	delete: host[env].pubUserURL + '/activities/digest/delete/',// 删除摘要配置管理
}

// 服务配置管理
export const service = {
	list: host[env].pubUserURL + '/activities/serviceconfig/page',// 摘要配置管理查询<分页>
	save: host[env].pubUserURL + '/activities/serviceconfig/save',// 保存摘要配置管理
	delete: host[env].pubUserURL + '/activities/serviceconfig/delete/',// 删除摘要配置管理
}

// 公共信息配置
export const info = {
	list: host[env].pubUserURL + '/activities/publicinfo/page',// 公共信息查询<分页>
}

// 运维监控 monitor
// 服务器监控
export const mtServer = {
	list: host[env].pubMoniter + '/server/getServerList',// 获取服务器列表
	info: host[env].pubMoniter + '/server/getServerInfo',// 获取服务器监控详细信息
	getServerRealTimeInfo: host[env].pubMoniter + '/server/getServerRealTimeInfo',// 获取服务器监控实时监控信息
	history: host[env].pubMoniter + '/server/getPage',// 获取服务器监控历史列表
}
// 应用状态监控
export const mtApp = {
	list: host[env].pubMoniter + '/app/getList',// 获取应用监控列表
}

