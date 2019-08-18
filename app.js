//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
  
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow(e) {
    this.globalData.prevRoute = '/' + e.path
    this.checkAuthorize(e.path) //检查有没有授权
    //this.checkUserId()
  },
  checksession: function () {
    wx.checkSession({
      success: function (res) {
        wx.showToast({
          title: '欢迎回来',
          icon: 'none',
          duration: 1000
        })
      },
      fail: function (res) {
        wx.reLaunch({
          url: "/pages/index/index"
        });
      }
    })
  },
  checkAuthorize(path) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权
          console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称");
          //检查登录有没有过期
          that.checksession()
        } else {
          wx.reLaunch({
            url: "/pages/index/index"
          })
        }
      }
    })
  },
  checkUserId() {
    if (!wx.getStorageSync('user_id')) {
      wx.reLaunch({
        url: "/pages/index/index"
      })
    }
  },
  globalData: {
    userInfo: null,
    url: "https://nyms.wjtxmobile.com/"
  }
})