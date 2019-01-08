import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/userLayout'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: layout,
            children: [
                {path: '/', name: 'index', component: () => import('@/components/userInfo')},
                {path: '/password', name: 'mysearch', component: () => import('@/components/password')},
                {path: '/buyinfo', name: 'mydetails', component: () => import('@/components/buyInfo')}
            ]
        }
    ]
})
