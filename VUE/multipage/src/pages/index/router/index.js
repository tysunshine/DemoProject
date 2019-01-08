import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/indexLayout'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: layout,
            children: [
                {path: '/', name: 'index', component: () => import('@/components/home')},
                {path: '/mysearch', name: 'mysearch', component: () => import('@/components/mySearch')},
                {path: '/mydetails', name: 'mydetails', component: () => import('@/components/myDetails')}
            ]
        }
    ]
})
