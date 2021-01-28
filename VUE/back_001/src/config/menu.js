// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
    {   
        path: '/opexmonitor',
        name: '运维监控',
        icon: 'el-icon-cpu',
        children: [
            {
                path: '/server',
                name: '服务器监控',
            },
            {
                path: '/appState',
                name: '应用状态监控',
            },
        ]
    }
];

export {headerMenuConfig, asideMenuConfig};
