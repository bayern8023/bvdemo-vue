import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// hidden:true如果设置为true，则不会在侧边栏中显示该项（默认为false）
// alwaysShow:true如果设置为true，将始终显示根菜单 ,如果未设置alwaysShow，则当项目有多个子路径时，它将变成嵌套模式，否则不显示根菜单
// redirect：如果设置了noRedirect，则noRedirect将不会在breadcrumb中重定向
// name:'router-name'名称由<keep alive>使用（必须设置！！！）
// meta：{
// roles：['admin'，'editor']控制页面角色（可以设置多个角色）
// title:'title'在侧边栏和面包屑中显示的名称（推荐集）
// icon:'svg name'/'el-icon-x'图标显示在侧边栏中
// noCache:true如果设置为true，则不会缓存该页（默认值为false）
// affix：true如果设置为true，则标签将在tags视图中粘贴
// breadcrumb:false如果设置为false，则项目将隐藏在breadcrumb中（默认为true）
// activeMenu:'/example/list'如果设置路径，侧栏将突出显示您设置的路径

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/DynamicTable',
    children: [{
      path: 'DynamicTable',
      component: () => import('@/views/meeting/dynamic-table/index'),
      name: 'DynamicTable',
      meta: {
        title: '创建会议',
        icon: 'money'
      }
    }]
  },
  {
    path: '/inline-edit-table',
    component: Layout,
    meta: {
      title: '会议列表',
      icon: 'tree-table',
    },
    redirect: '/inline-edit-table/InlineEditTable',
    children: [{
        path: 'InlineEditTable',
        component: () => import('@/views/meeting/inline-edit-table'),
        name: 'InlineEditTable',
        meta: {
          title: '会议列表',
          icon: 'tree-table'
        }
      },
      {
        path: 'meetingInfo',
        component: () => import('@/views/meeting/meetingInfo'),
        name: 'MeetingInfo',
        meta: {
          title: '会议详情',
          icon: 'component',
        },
        hidden: true
      },
      {
        path: 'MeetingCycle',
        component: () => import('@/views/meeting/meetingCycle'),
        name: 'MeetingCycle',
        meta: {
          title: '周期会议',
          icon: 'component'
        },
        hidden: true
      },
      {
        path: 'meetingModify',
        component: () => import('@/views/meeting/meetingModify'),
        name: 'MeetingModify',
        meta: {
          title: '编辑会议',
          icon: 'component'
        },
        hidden: true
      },
      {
        path: 'meetingControl',
        component: () => import('@/views/meeting/meetingControl'),
        name: 'MeetingControl',
        meta: {
          title: '会议控制',
          icon: 'component'
        },
        hidden: true
      }
    ]

  },
  {
    path: '/template',
    component: Layout,
    meta: {
      title: '会议模板',
      icon: 'clipboard',
    },
    redirect: '/template',
    children: [{
      path: '/template',
      component: () => import('@/views/template/index'),
      name: '会议模板',
      meta: {
        title: '会议模板',
      }
    }, {
      path: 'createtemplate',
      component: () => import('@/views/template/createtemplate'),
      name: '创建模板',
      hidden: true,
      meta: {
        title: '创建模板',
      }
    }, {
      path: 'Modifytemplate',
      component: () => import('@/views/template/Modifytemplate'),
      name: '修改模板',
      hidden: true,
      meta: {
        title: '修改模板',
      }
    }, {
      path: 'Templatedetails',
      component: () => import('@/views/template/Templatedetails'),
      name: '模板详情',
      hidden: true,
      meta: {
        title: '模板详情',
      }
    }]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
