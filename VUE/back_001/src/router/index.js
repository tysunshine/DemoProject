import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
      path: '/',
      redirect: '/login',
  },
  {
      path: '/home',
      redirect: '/opexmonitor/server',
  },
  {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
  },
  {
      path: '/layout',
      name: 'layout',
      component: () => import('@/layouts/HeaderAsideLayout'),
      children: [
        // 运维监控
        {
          path: '/opexmonitor/server',
          component: () => import('@/views/opex-monitor/server-monitor/index.vue'),
        },
        {
          path: '/opexmonitor/server/detail',
          component: () => import('@/views/opex-monitor/server-monitor/detail.vue'),
          meta: {
            mbx: '详情',
            active: '/opexmonitor/server'
          }
        },
        {
          path: '/opexmonitor/appState',
          component: () => import('@/views/opex-monitor/app-state-monitor/index.vue'),
        },
      ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
