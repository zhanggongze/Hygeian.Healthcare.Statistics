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
import doctorIM from '@/components/doctorIM'
import doctorConsultByAsk from '@/components/doctorConsultByAsk'
import dayConsultByAsk from '@/components/dayConsultByAsk'
import dayIM from '@/components/dayIM'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/doctorIM',
      name: 'doctorIM',
      component: doctorIM
    },
    {
      path: '/doctorConsultByAsk',
      name: 'doctorConsultByAsk',
      component: doctorConsultByAsk
    },
    {
      path: '/dayConsultByAsk',
      name: 'dayConsultByAsk',
      component: dayConsultByAsk
    },
    {
      path: '/dayIM',
      name: 'dayIM',
      component: dayIM
    },
  ]
})
