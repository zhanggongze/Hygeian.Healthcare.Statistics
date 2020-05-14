/*
 * @Author: zgz
 * @Date: 2020-03-31 14:24:33
 * @LastEditTime: 2020-04-01 18:25:27
 * @LastEditors: zgz
 * @Description: file conten
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "swiper/css/swiper.css";

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/radar'

Vue.component('chart', ECharts)

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
