import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },

  // 原生vue
  {
    path: '/original',
    name: 'original',
    component: () => import('../views/Original/index.vue'),
    children: [
      {
        path: '/original/sidebar',
        name: 'ogSidebar',
        component: () => import('../views/Original/sidebar/index.vue')
      }
    ]
  },

  // element-ui
  {
    path: '/elementuilayout',
    name: 'elLayout',
    component: () => import('../views/ElementUi/index.vue'),
    children: [
      {
        path: '/elementuilayout/date',
        name: 'elDate',
        component: () => import('../views/ElementUi/Date/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
