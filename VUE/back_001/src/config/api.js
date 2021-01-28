// 数据请求接口

// const env = "online"; // 打包
const env = "test"; // 测试

const host = {
	online: {
		pubMoniter: '/api/monitor', // 监控
	},
	test: {
		pubMoniter: 'http://172.30.34.4:18888/api/monitor', // 监控
	},
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

