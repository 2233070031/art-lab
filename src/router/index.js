import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: '/',
    component: () => import('../layout'),
    redirect: '/taskList',
    children: [
      {
        path: 'egg',
        name: 'egg',
        component: () => import('@/views/egg/index.vue'),
        meta: { title: '取卵通知单' }
      },
      {
        path: 'sperm',
        name: 'sperm',
        component: () => import('@/views/sperm/index.vue'),
        meta: { title: '取精通知单' }
      },
      {
        path: 'iui',
        name: 'iui',
        component: () => import('@/views/iui/index.vue'),
        meta: { title: '人授通知单' }
      },
      {
        path: 'fet',
        name: 'fet',
        component: () => import('@/views/fet/index.vue'),
        meta: { title: '解冻移植通知单' }
      },
      {
        path: 'taskList',
        name: 'taskList',
        component: () => import('@/views/task-list/index.vue'),
        meta: { title: '任务清单' }
      },
      {
        path: 'pickEgg',
        name: 'pickEgg',
        component: () => import('@/views/pickEgg-summary/index.vue'),
        meta: { title: '当日捡卵汇总' }
      },
      {
        path: 'pickFET',
        name: 'pickFET',
        component: () => import('@/views/pickFET-summary/index.vue'),
        meta: { title: '当日移植汇总' }
      },
      {
        path: 'semen',
        name: 'semen',
        component: () => import('@/views/semen-summary/index.vue'),
        meta: { title: '精液汇总' }
      },
      {
        path: 'frozen',
        name: 'frozen',
        component: () => import('@/views/frozen-summary/index.vue'),
        meta: { title: '冷冻汇总' }
      },
      {
        path: 'unfreeze',
        name: 'unfreeze',
        component: () => import('@/views/unfreeze-summary/index.vue'),
        meta: { title: '解冻汇总' }
      },
      {
        path: 'eggRecords',
        name: 'eggRecords',
        component: () => import('@/views/pickEgg-records/index.vue'),
        meta: { title: '捡卵记录' }
      },
      {
        path: 'semenTreatment',
        name: 'semenTreatment',
        component: () => import('@/views/semenTreatment/index.vue'),
        meta: { title: '精液处理' }
      },
      {
        path: 'embryoObservation',
        name: 'embryoObservation',
        component: () => import('@/views/embryoObservation/index.vue'),
        meta: { title: '胚胎观察' }
      },
      {
        path: 'freshEmbryo',
        name: 'freshEmbryo',
        component: () => import('@/views/freshEmbryo/index.vue'),
        meta: { title: '鲜胚处理' }
      },
      {
        path: 'thawed',
        name: 'thawed',
        component: () => import('@/views/thawed/index.vue'),
        meta: { title: '解冻处理' }
      },
      {
        path: 'consumables',
        name: 'consumables',
        component: () => import('@/views/consumables/index.vue'),
        meta: { title: '耗材及备液' }
      },
      {
        path: 'spermSupply',
        name: 'spermSupply',
        component: () => import('@/views/spermSupply/index.vue'),
        meta: { title: '供精管理' }
      },
      {
        path: 'tank',
        name: 'tank',
        component: () => import('@/views/tank/index.vue'),
        meta: { title: '液氮罐管理' }
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/statistics/index.vue'),
        meta: { title: '统计' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
