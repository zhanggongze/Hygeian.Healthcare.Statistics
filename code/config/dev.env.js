'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  api:"https://qcloud.services.dev.hygeian.com.cn/services/report/api/v1/"
})
