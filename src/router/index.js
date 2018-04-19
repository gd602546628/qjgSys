import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index.vue'
import login from '@/page/login.vue'
import nav1 from '@/page/nav1/nav1.index.vue'
/*广告管理start*/
import advertiseManage from '@/page/nav1/advertiseManage/advertiseManage.vue'
import addAdvertise from '@/page/nav1/advertiseManage/addAdvertise.vue'
/*广告管理END*/

/*图标管理start*/
import iconManage from '../page/nav1/iconManage/iconManage.vue'
import iconEdit from '../page/nav1/iconManage/iconEdit.vue'
/*图标管理END*/

/*分类管理start*/
import cateManage from '../page/nav1/cateManage/cateManage.vue'
/*分类管理END*/

/*系统设置start*/
import agentManage from '../page/nav1/systemManage/agentManage.vue'
/*账号管理start*/
import roleManage from '@/page/nav1/systemManage/roleManage.vue'
import accountManage from '@/page/nav1/systemManage/accountManage.vue'
import addRole from '@/page/nav1/systemManage/addRole.vue'
import addAcount from '@/page/nav1/systemManage/addAccount.vue'
/*账号管理end*/
/*系统设置start*/
import areaManage from '../page/nav1/areaManage/areaManage.vue'
import addArea from '../page/nav1/areaManage/addArea.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/nav1'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/nav1',
      children: [
        {
          path: 'nav1',
          component: nav1,
          name: 'nav1',
          redirect: '/index/nav1/advertiseManage',
          children: [
            /*广告管理start*/
            {
              path: 'advertiseManage',
              component: advertiseManage,
              name: 'advertiseManageIndex'
            },
            {
              path: 'addAdvertise/:id?',
              component: addAdvertise,
              name: 'addAdvertise'
            },
            /*广告管理End*/

            /*图标管理 start*/
            {
              path: 'iconManage',
              component: iconManage,
              name: 'iconManage'
            },
            {
              path: 'iconEdit',
              component: iconEdit,
              name: 'iconEdit',
              meta: {
                activeName: 'iconManage'
              }
            },
            /*图标管理 end*/

            /*分类管理 start*/
            {
              path: 'cateManage',
              component: cateManage,
              name: 'cateManage'
            },
            /*分类管理 end*/
            /*区域管理 start*/
            {
              path: 'areaManage',
              component: areaManage,
              name: 'areaManage'
            },
            {
              path: 'addArea',
              component: addArea,
              name: 'addArea',
              meta: {
                activeName: 'areaManage'
              }
            },
            /*区域管理 end*/
            /*系统管理start*/
            {
              path: 'agentManage',
              component: agentManage,
              name: 'agentManage',
            },
            {
              path: 'systemRoleManage',
              component: roleManage,
              name: 'roleManage'
            },
            {
              path: 'systemAccountManage',
              component: accountManage,
              name: 'accountManage'
            },
            {
              path: 'systemAddRole/:id?',
              component: addRole,
              name: 'addRole',
              meta: {
                activeName: 'roleManage'
              }
            },
            {
              path: 'systemAddAccount',
              component: addAcount,
              name: 'addAccount',
              meta: {
                activeName: 'accountManage'
              }
            },
            /*系统管理End*/
          ]
        }
      ]
    }
  ]
})
