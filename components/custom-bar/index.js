Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    idx: {
      type: Number,
      value: 0
    },
  },
  data: {
    tabBar: [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        // "iconPath": "/assets/icon-activity.png",
        // "selectedIconPath": "/assets/icon-activity1.png"
      },
      {
        "pagePath": "/pages/mine/index",
        "text": "我的",
        // "iconPath": "/assets/icon-walk.png",
        // "selectedIconPath": "/assets/icon-walk1.png"
      }
    ]
  },
  methods: {
    goToTab: function (e) {
      //如果点击当前页面则不进行跳转
      if (this.data.idx == e.currentTarget.dataset.index) {
        return false
      }
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    }
  }
})