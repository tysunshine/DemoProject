import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/page1'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/page1.vue'),
        meta: {
          text: '页面1'
        }
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/page2.vue'),
        meta: {
          text: '页面2'
        }
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import('../views/page3.vue'),
        meta: {
          text: '页面3'
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  
  store.commit('pathChange', to); // 页面路由切换改变缓存列表
  next();
  
})

router.afterEach(() => {
  console.log(store.getters.keepList);
})


export default router
