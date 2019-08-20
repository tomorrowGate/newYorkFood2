//app.js
import { PM } from "./utils/page.js"
let page = new PM
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
  page: page,
  globalData: {
    userInfo: null,
    url: "https://nyms.wjtxmobile.com/"
  },
  get_info: function () {
    var user_id = wx.getStorageSync('user_id')
    var that = this;
    if (user_id == 0 || user_id == "" || !user_id) {
      wx.reLaunch({
        url: '/pages/index/authorize.wxml',
      })
      return;
    } else {
      //查询好多数据
      wx.request({
        url: that.globalData.url + 'index.php?app=nyms_myinfo&act=get_info',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          user_id
        },
        success: function (res) {
          if (res.data.done) {
            var identity = res.data.retval.im_aliww;
            var identity_str = "游客";
            //member数据
            wx.setStorageSync("identity_str", identity_str);
            wx.setStorageSync("identity", res.data.retval.im_aliww);
            wx.setStorageSync("real_name2", res.data.retval.real_name2);
            wx.setStorageSync("phone_mob", res.data.retval.phone_mob);
            wx.setStorageSync("zhun", res.data.retval.zhun);
            wx.setStorageSync("apply_store", res.data.retval.apply_store);
            wx.setStorageSync("my_dealer", res.data.retval.my_dealer);
            wx.setStorageSync("my_brand", res.data.retval.my_brand);
            wx.setStorageSync("wx_id", res.data.retval.wx_id);
            wx.setStorageSync("openid", res.data.retval.openid);
            //address
            wx.setStorageSync("region_name", res.data.retval.region_name);
            wx.setStorageSync("address", res.data.retval.address);
            //brand
            wx.setStorageSync("brand_name", res.data.retval.brand_name);
            wx.setStorageSync("brand_logo", res.data.retval.brand_logo);
            wx.setStorageSync("brand_introduce", res.data.retval.brand_introduce);
            //平台简介和服务热线
            wx.setStorageSync("server_num", res.data.retval.hotline);
            wx.setStorageSync("ptjj", res.data.retval.site_description);
          } else {

          }
        },
        fail: function (err) {

        },
        complete: function (res) {
          console.log(res);
        }
      })
    }
  }
  
})