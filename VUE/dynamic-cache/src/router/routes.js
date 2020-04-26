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
				name: 'studentlist',
				component: () => import('../views/student-list.vue'),
				meta: {
					cache:  true
				}
			},
			{
				path: '/home/courselist',
				name: 'courselist',
				component: () => import('../views/course-list.vue'),
				meta: {
					cache:  true
				}
			},
		]
	},
		  
]

export default routes;