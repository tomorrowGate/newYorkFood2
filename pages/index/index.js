//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    globalData: { latitude: "", longitude:""}
  },
  onAuthLocation() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
        console.log('成功：', res)
      },
      fail: (res) => {
        console.log('失败：', res)
      },
    })
  },
  //事件处理函数
  /* bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, */
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.showLoading({
            title: '正在自动登录',
          })
          wx.getUserInfo({
            success(res) {
              //console.log(res,"已经授权，可以直接调用 getUserInfo 获取头像昵称");
              var nickname = res.userInfo.nickName;
              var headimgurl = res.userInfo.avatarUrl;
              wx.login({
                success(res) {
                  //console.log(res);
                  if (res.code) {
                    var code = res.code
                    wx.setStorageSync("code", res.code);
                    app.globalData.userInfo.code = code
                    app.globalData.userInfo.nickname = nickname;//存到app中
                    app.globalData.userInfo.headimgurl = headimgurl;//存到app中

                    that.postUserInfo(code, nickname, headimgurl);
                    var timer = setTimeout(function () {
                      wx.hideLoading()
                    }, 2000)
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  postUserInfo(code, nickname, headimgurl){
    var that = this
    wx.request({
      url: `${app.globalData.url}index.php?app=glogin`,
      data: {
        code: code,
        nickname: nickname,
        headimgurl: headimgurl,
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success(res) {
        console.log(res, "---------------------login---success")
        if (res.data.done) {
          wx.setStorageSync("user_id", res.data.retval.user_id);//存user_id
          app.get_info();
          wx.reLaunch({
            /* url: "/pages/link/link" */
            url: "/pages/index/map_index"
          });
          return;
        }
        else {
          wx.showToast({
            title: '返回值出现问题',
            icon:"none"
          })
          return;
        }
      },
      fail: function (res) {
        console.log(res,"---------------------login---fail")
        wx.showToast({
          title: '服务器出现问题',
          icon: "none"
        })
      },
      complete: function (res) {
        
      },
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
