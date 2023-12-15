import toAsync from './utils/toAsync'
import regeneratorRuntime from 'regenerator-runtime'

// app.js
App({
  onLaunch(option) {
    // 展示本地存储能力
    wx.async = toAsync //使微信原生异步函数支持async
  },
  globalData: {
    userInfo: null
  },
  regeneratorRuntime,//使页面支持async
})
