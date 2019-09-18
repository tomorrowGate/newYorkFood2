//app.js
import locales from './utils/web'
import T from './utils/i18n'

//console.log(wx.getSystemInfoSync().language)
//let defautLan = wx.getSystemInfoSync().language=="zh"?0:1
T.registerLocale(locales);
T.setLocaleByIndex(wx.getStorageSync('langIndex') || 0);
wx.setStorageSync('langIndex', wx.getStorageSync('langIndex') || 0)
wx.T = T;


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
    console.log(e, 11111)
    //this.checkAuthorize(e.path) //检查有没有授权
    //this.checkUserId()
  },
  checksession: function () {
    wx.checkSession({
      success: function (res) {
        /*  wx.showToast({
           title: '欢迎回来',
           icon: 'none',
           duration: 1000
         }) */
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
    url: "https://nyms.wjtxmobile.com/",
    latitude: 0,
    longitude: 0,
    toClassifyStoreId:-2,
    clickStoreId:-1,
    renderListData:[]
  },
  get_info: function () {
    return new Promise((resove, rej) => {
      var user_id = wx.getStorageSync('user_id')
      var cOre = wx.getStorageSync("langIndex")
      var that = this;
      if (user_id == 0 || user_id == "" || !user_id) {
        // wx.reLaunch({
        //   url: '/pages/index/index.wxml',
        // })
        // return;
      } else {
        //查询好多数据
        wx.request({
          url: that.globalData.url + 'index.php?app=nyms_myinfo&act=get_info',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: {
            user_id,
            cOre
          },
          success: function (res) {
            if (res.data.done) {
              var identity = res.data.retval.im_aliww;
              //member数据
              wx.setStorageSync("identity", res.data.retval.im_aliww);
              wx.setStorageSync("gender", res.data.retval.gender);
              wx.setStorageSync("real_name2", res.data.retval.real_name2);
              wx.setStorageSync("birthday", res.data.retval.birthday);
              wx.setStorageSync("phone_mob", res.data.retval.phone_mob);
              wx.setStorageSync("sign", res.data.retval.sign);
              wx.setStorageSync("portrait", res.data.retval.portrait);
              wx.setStorageSync("real_name", res.data.retval.real_name);
              wx.setStorageSync("Equity", res.data.retval.Equity);//权益数组
              wx.setStorageSync("note", res.data.retval.note);//注意事项
              wx.setStorageSync("has_read", res.data.retval.has_read);//是否有已读消息
              wx.setStorageSync("is_store", res.data.retval.is_store);//是否是店铺
              wx.setStorageSync("openid", res.data.retval.openid);

              that.getLocation(res.data.retval.openid)
              resove("OK")
            } else {
              rej("err")
            }
          },
          fail: function (err) {
            rej("err")
          },
          complete: function (res) {
            //console.log(res);
          }
        })
      }
    })

  },
  getLocation() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function (res) {
        //console.log(res, "res")
        wx.setStorageSync("lat", res.latitude);
        wx.setStorageSync("lng", res.longitude);

        that.globalData.latitude = res.latitude
        that.globalData.longitude = res.longitude
      }
    })
  },
  checkGeo() {
    return new Promise((resove, rej)=>{
      let that = this
      wx.getSetting({
        success: (res) => {
          //没授权地理位置
          if (!res.authSetting['scope.userLocation']) {
            wx.openSetting({
              success: function (data) {
                console.log(data);
                if (data.authSetting["scope.userLocation"] == true) {
                  that.getLocation()
                }
              }
            })

          }
        },
        complete(res) {
          console.log(res.authSetting["scope.userLocation"], res)
          resove(res.authSetting["scope.userLocation"]) 
        }
      })

    })
  },
  checkUser() {
    if (!wx.getStorageSync("user_id")) {
      wx.showModal({
        title: '前往认证？',
        content: '是否前往认证？',
        success: function (res) {
          if (res.cancel) {
            wx.switchTab({
              url: '/pages/index/map_index',
            })
          } else {
            //点击确定
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})


// {
//   "pagePath": "member/page/menber_index",
//     "iconPath": "/src/img/huiyuan.png",
//       "selectedIconPath": "/src/img/Ahuiyuan.png",
//         "text": "会员"
// },