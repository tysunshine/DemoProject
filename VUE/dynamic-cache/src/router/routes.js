const routes = [
	{
		path: '/',
		name: '首页',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),

		children: [
			{
				path: '/home/studentlist',
				name: 'studentList',
				component: () => import('../views/student-list.vue'),
				meta: {
					keepAlive: true,
					cache:  ['studentDetail']
				}
			},
			{
				path: '/home/studentdetail',
				name: 'studentDetail',
				component: () => import('../views/student-detail.vue'),
			},
			{
				path: '/home/courselist',
				name: 'courseList',
				component: () => import('../views/course-list.vue')
			},
		]
	},
		  
]

export default routes;