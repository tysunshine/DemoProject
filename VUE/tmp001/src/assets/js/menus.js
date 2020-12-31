/*
tcm 中医药
phr 健康档案
stats 统计分析
char 特色
op 门诊
emer 突发事件
*/


export default [
	{
		path: '/home',
		name: '首 页',
		target: "_blank", // 新窗口打开
		icon: 'el-icon-s-home',
	},
	{
		redirect: '/phr-stats',
		name: '综合指标',
		icon: 'el-icon-s-data',
		children: [
			{
				redirect: '/phr-stats',
				name: '公共卫生',
				children: [
					{
						name: '健康档案',
						children: [
							{
								path: '/phr-stats',
								name: '健康档案管理统计分析'
							}
						]
					},
					{
						name: '健康管理',
						children: [
							{
								path: '/children-stats',
								name: '0-6岁儿童健康管理'
							},
							{
								path: '/aged-stats',
								name: '老年人健康管理'
							},
							{
								path: '/hypertension-stats',
								name: '高血压患者健康管理'
							},
							{
								path: '/diabetes-stats',
								name: '糖尿病患者健康管理'
							},
							{
								path: '/tcm-char-stats',
								name: '中医药特色服务分析'
							},
						]
					},
				]
			},
			{
				redirect: '/tcm-cost-stats',
				name: '医疗服务',
				children: [
					{
						name: '医疗服务利用',
						children: [
							{
								path:'/op-emer',
								name: '中医门急诊人次'
							},
							{
								path:'/leave-hospital',
								name: '中医出院人数'
							},
							{
								path:'/drug-prescription',
								name: '中医药品处方'
							},
						]
					},
				]
			},
		]
	}
]