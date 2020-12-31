import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import tools from '../assets//js/tools.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      no: true
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '/empty',
        name: 'empty',
        component: () => import('../views/layout/empty.vue'),
        meta: {
          no: true
        }
      },

      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue'),
      },

      // 综合指标------------------------
      // 健康档案管理统计分析
      {
        path: '/phr-stats',
        name: 'phr-stats',
        component: () => import('../views/comp-quota/public-health/phr/phr-stats.vue')
      },
      {
        path: '/children-stats',
        name: 'children-stats',
        component: () => import('../views/comp-quota/public-health/health-manage/children-stats.vue')
      },
      {
        path: '/aged-stats',
        name: 'aged-stats',
        component: () => import('../views/comp-quota/public-health/health-manage/aged-stats.vue')
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.no) {
    // 作用：相同路由，参数不同时，刷新
    if (to.path == from.path && to.fullPath != from.fullPath) {
      tools.storage.set('emptyPath', {
        fullPath: to.fullPath,
        path: to.path
      });
      router.replace('/empty');
    } else {
      store.commit('LAYOUT_KEEPLIST', to);
      next();
    }
  } else {
    next();
  }
})

export default router
