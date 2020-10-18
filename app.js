//app.js 注册小程序
App({

  onLaunch: function () {
    this.getDeviceInfo();
  },

  getDeviceInfo() {
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.deviceInfo = result;
      },
    })
  },

  onShow() {
  },
  onHide() {
  },
  onPageNotFound() {
  },
  globalData: {
    userInfo: null,
    deviceInfo: null,
  }
})