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
    path: '/drill',
    name: 'home',
    component: HomeView,
    children : [
      {
        path : '/sangjiDemo',
        name : 'sangjiDemo',
        component : ()=>import(/* webpackChunkName: "sangjiDemoe" */'../views/demo/sangjiDemo.vue')
      },
      {
        path : '/sangjiDemo2',
        name : 'sangjiDemo2',
        component : ()=>import(/* webpackChunkName: "sangjiDemo2" */'../views/demo/sangjiDemo2.vue')
      },
      {
        path : '/tableDemo',
        name : 'tableDemo',
        component : ()=>import(/* webpackChunkName: "tableDemo" */'../views/demo/tableDemo.vue')
      },
      {
        path : '/zhezhuDemo',
        name : 'zhezhuDemo',
        component : ()=>import(/* webpackChunkName: "zhezhuDemo" */'../views/demo/zhezhuDemo.vue')
      },
      {
				path: '/revenue',
				name: 'revenue',
				component: () => import('../views/demo/revenue.vue')
			},
      {
        path : '/columnChartDemo',
        name : 'columnChartDemo',
        component : ()=>import(/* webpackChunkName: "columnChartDemo" */'../views/demo/columnChartDemo.vue')
      },
      {
        path : '/scatterPlotDemo',
        name : 'scatterPlotDemo',
        component : ()=>import(/* webpackChunkName: "scatterPlotDemo" */'../views/demo/scatterPlotDemo.vue')
      },
      {
        path : '/cacheDemo',
        name : 'cacheDemo',
        component : ()=>import(/* webpackChunkName: "cacheDemo" */'../views/demo/cacheDemo.vue'),
        meta : {
          hidden : true
        }
      },
      {
        path : '/dragDemo',
        name : 'dragDemo',
        component : ()=>import(/* webpackChunkName: "dragDemo" */'../views/demo/dragDemo.vue'),
        meta : {
          hidden : true
        }
      },
      {
        path : '/dynamicCloumns',
        name : 'dynamicCloumns',
        component : ()=>import(/* webpackChunkName: "dynamicCloumns" */'../views/demo/dynamicCloumns.vue')
      },
      {
        path : '/breadcrumb',
        name : 'breadcrumb',
        component : ()=>import(/* webpackChunkName: "breadcrumb" */'../views/demo/breadcrumb.vue')
      },
      {
        path : '/zhezhuClick',
        name : 'zhezhuClick',
        component : ()=>import(/* webpackChunkName: "zhezhuClick" */'../views/demo/zhezhuClick.vue')
      },
      {
        path : '/tableHeadTopDemo',
        name : 'tableHeadTopDemo',
        component : ()=>import(/* webpackChunkName: "tableHeadTopDemo" */'../views/demo/tableHeadTopDemo.vue'),
        meta : {
          hidden : true
        }
      },
      {
        path : '',
        name : 'drill',
        component : ()=>import(/* webpackChunkName: "drill" */'../views/LeanAnalyze/drillAnalyze.vue')
      },
      {
        path : '/loopAnalyze',
        name : 'loopAnalyze',
        component : ()=>import(/* webpackChunkName: "loopAnalyze" */'../views/LeanAnalyze/loopAnalyze.vue')
      },
      {
        path : '/preRealComparsion',
        name : 'preRealComparsion',
        component : ()=>import(/* webpackChunkName: "loopAnalyze" */'../views/LeanAnalyze/preRealComparsion.vue')
      },
      {
        path : '/departmentRingSame',
        name : 'departmentRingSame',
        component : ()=>import(/* webpackChunkName: "departmentRingSame" */'../views/ringAnalyze/departmentRingSame.vue')
      },
      {
        path : '/customerRingSame',
        name : 'customerRingSame',
        component : ()=>import(/* webpackChunkName: "customerRingSame" */'../views/ringAnalyze/customerRingSame.vue')
      },
      {
        path : '/lookChart',
        name : 'lookChart',
        component : ()=>import(/* webpackChunkName: "lookChart" */'../views/ringAnalyze/lookChart.vue'),
        meta : {
          hidden : true
        }
      },
      {
        path : '/ringContrastChart',
        name : 'ringContrastChart',
        component : ()=>import(/* webpackChunkName: "ringContrastChart" */'../views/ringAnalyze/ringContrastChart.vue'),
        meta : {
          hidden : true
        }
      },
      {
        path : '/projectRingSame',
        name : 'projectRingSame',
        component : ()=>import(/* webpackChunkName: "projectRingSame" */'@/views/ringAnalyze/projectRingSame.vue'),
        meta : {
          hidden : true
        }
      },
      {
        path : '/departmentEffect',
        name : 'departmentEffect',
        component : ()=>import(/* webpackChunkName: "userDetail" */'../views/dataManagement/departmentEffect.vue')
      },
      {
        path : '/calendarEvents',
        name : 'calendarEvents',
        component : ()=>import(/* webpackChunkName: "userDetail" */'@/views/dataManagement/calendarEvents.vue')
      },
      {
        path : '/comprehensivePersonnelCost',
        name : 'comprehensivePersonnelCost',
        component : ()=>import(/* webpackChunkName: "comprehensivePersonnelCost" */'../views/dataManagement/comprehensivePersonnelCost.vue'),
      },
      {
        path : '/empInfo',
        name : 'empInfo',
        component : ()=>import(/* webpackChunkName: "empInfo" */'@/views/dataManagement/empInfo.vue'),
      },
      {
        path : '/tableCanvas',
        name : 'tableCanvas',
        component : ()=>import(/* webpackChunkName: "tableCanvas" */'@/views/demo/tableCanvas.vue')
      },
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
      },
      {
        path : '/organizationalStructure',
        name : 'organizationalStructure',
        component : ()=>import(/* webpackChunkName: "organizationalStructure" */'../views/staffStatistics/organizationalStructure.vue'),
        meta : {
          hidden : true
        }
      },
      {
        path: '/empStatistics',
        name: 'empStatistics',
        component: () => import(/* webpackChunkName: "empStatistics" */'../views/staffStatistics/empStatistics.vue'),
      },
      {
        path : '/staticPicture',
        name : 'staticPicture',
        component : ()=>import(/* webpackChunkName: "staticPicture" */'../views/staffStatistics/staffStatics/staticPicture.vue'),
      },
      {
        path : '/staticDetail',
        name : 'staticDetail',
        component : ()=>import(/* webpackChunkName: "staticDetail" */'../views/staffStatistics/staffStatics/staticDetail.vue'),
        meta : {
          hidden : true
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
