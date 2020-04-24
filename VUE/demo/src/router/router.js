import Home from '../views/Home.vue'

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

export default routes;