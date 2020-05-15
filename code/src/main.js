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

// 公共方法类
import utils from "./assets/js/utils";
Vue.prototype.$utils = utils;

// axios 配置
import prodEnv from "../config/dev.env";
import axios from "axios";
axios.defaults.baseURL = prodEnv.api;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      alert(error.response.data.message||"网络异常,请稍后重试！");
      return Promise.reject(error.response);
    }
  }
);

Vue.prototype.$http = axios;

// echars组件
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import "echarts/lib/chart/bar";
import 'echarts/lib/chart/radar'
Vue.component('chart', ECharts)

// 时间选择器组件
import vueHashCalendar from 'vue-hash-calendar'
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
Vue.use(vueHashCalendar)

// 提示开发环境
Vue.config.productionTip = true

//  全局注册加载动画组件
import loadingComponent from "./components/loadingComponent";
Vue.component('loadingComponent', loadingComponent)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
