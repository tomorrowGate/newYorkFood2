// find/components/store_detail.js
let app = getApp()
let QQMapWX = require('../../utils//qqmap-wx-jssdk.min.js');
var qqmapsdk;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    store_info: {
      type: Object,
      value: {},
      observer: function () {
        //console.log(this.properties.store_info,"店铺详细信息对象")
        if (this.properties.store_info.has_collect>0){
          this.setData({
            isCollectIt: true
          })
        }else{
          this.setData({
            isCollectIt: false
          })
        }
      }
    },
    tag_info: {
      type: Array,
      value: [],
      observer: function () {
        //console.log(this.properties.tag_info, "店铺标签详细信息对象")
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCollectIt:false//是否收藏
  },

  /**
   * 组件的方法列表
   */
  methods: {
    callPhone(){
      let that = this;
      wx.makePhoneCall({
        phoneNumber: that.properties.store_info.tel
      })
    },
    /*点击收藏*/
    collectIt(){
      let that=this;
      if (!wx.getStorageSync("user_id")) {
        let title = wx.getStorageSync("langIndex") == 0 ? "登录授权" : "Login"
        let content = wx.getStorageSync("langIndex") == 0 ? "您还没有登录授权，是否登录" : "You haven't logged in yet. Do you logon or not?"
        let cancelText = wx.getStorageSync("langIndex") == 0 ? "取消" : "No"
        let confirmText = wx.getStorageSync("langIndex") == 0 ? "确定" : "Yes"
        wx.showModal({
          title,
          content,
          showCancel: true,
          cancelText,
          confirmText,
          success: function (res) {
            if (res.cancel) {

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
      

      if (that.properties.store_info.store_id){
        wx.request({
          url: app.globalData.url + 'index.php?app=nyms_homepage&act=setCollectStore',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: {
            store_id: that.properties.store_info.store_id,
            user_id:wx.getStorageSync("user_id"),

            cOre: wx.getStorageSync("langIndex")
          },
          success: function (res) {
            if (res.data.done) {
              that.setData({
                isCollectIt: res.data.retval
              })
              app.globalData.toClassifyStoreId = that.properties.store_info.store_id
            } else {

            }
          },
          fail: function (err) {

          },
          complete: function (res) {
            //console.log(res);
          }
        })
      }
    },
    navigation(e) {
      app.checkGeo()
      let cuslat = e.currentTarget.dataset.cuslat
      let cuslng = e.currentTarget.dataset.cuslng
      let store_id = e.currentTarget.dataset.store_id

      var addr = e.target.dataset.addr;
      var that = this;
      
      // 使用微信内置地图查看位置
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          wx.openLocation({
            latitude: parseFloat(cuslat),            
            longitude: parseFloat(cuslng),
            scale: 28,
            name: addr, //打开后显示的地址名称
          })
        }
      })
      return
      // wx.navigateTo({
      //   url: `/classify/page/classify_link?cuslat=${cuslat}&cuslng=${cuslng}&store_id=${store_id}`,
      // })
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    },

  },

  pageLifetimes: {
    show: function () {
      this.setLanguage();
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        langIndex: wx.getStorageSync('langIndex')
      });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
