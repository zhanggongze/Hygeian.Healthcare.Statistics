/*
 * @Author: zgz
 * @Date: 2020-03-31 14:24:33
 * @LastEditTime: 2020-03-31 17:52:31
 * @LastEditors: zgz
 * @Description: file conten
 */
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import reportComponent from '@/components/reportComponent'
import reportPartnerComponent from '@/components/reportPartnerComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/reportComponent/:title',
      name: 'reportComponent',
      component: reportComponent
    },
    {
      path: '/reportPartnerComponent/:title',
      name: 'reportPartnerComponent',
      component: reportPartnerComponent
    },
   
  ]
})
