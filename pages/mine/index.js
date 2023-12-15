const app = getApp()
const computedBehavior = require('miniprogram-computed').behavior

Page({
  behaviors: [computedBehavior],
  data: {
    temp: 'hello world'
  },
  computed: {
    tempComputed(data) {
      return `${data.temp} Roxas`
    }
  },
})