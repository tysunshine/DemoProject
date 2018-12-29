export default {
	Layout: () => import('@/views/layout/index'),
	index: () => import('@/views/homepage/index'),
	workerType: () => import('@/views/workerSystem/workerType'),
	workerList: () => import('@/views/workerSystem/workerList'),
	studentType: () => import('@/views/studentSystem/studentType'),
	studentList: () => import('@/views/studentSystem/studentList'),
	collegeList: () => import('@/views/collegeSystem/collegeList')
}