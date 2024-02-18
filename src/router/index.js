import { createRouter,createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 跳转页面加meta信息
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/IndexView.vue')
  },
  {
    path: '/userList',
    name: 'home',
    component: HomeView,
    children : [
      {
        path : '/userList',
        name : 'userManage',
        component : ()=>import(/* webpackChunkName: "userManage" */'../views/system/userView.vue')
      },
      {
        path : '/menuManage',
        name : 'menuManage',
        component : ()=>import(/* webpackChunkName: "menuManage" */'../views/system/menuManage.vue')
      },
      {
        path : '/roleManage',
        name : 'roleManage',
        component : ()=>import(/* webpackChunkName: "roleManage" */'../views/system/roleManage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
		path: '/pageError',
		name: 'pageError',
		component: () => import(/* webpackChunkName: "pageFor404" */ '@/components/pageError.vue')
	},
  { path: '/:pathMatch(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
