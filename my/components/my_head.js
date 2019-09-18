// my/components/my_head.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    portrait: {
      type: String,
      value: wx.getStorageSync('portrait'),
    },
    real_name: {
      type: String,
      value: wx.getStorageSync('real_name'),
    },
    sign: {
      type: String,
      value: wx.getStorageSync('sign'),
    },
    has_read: {
      type: Number,
      value: wx.getStorageSync('has_read'),
    },
    language: {
      type: Object,
      value: wx.T.getLanguage(),
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_store: false,//是否是商户
    language: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goMessage() {
      wx.navigateTo({
        url: '/my/page/message/Message',
      })
    },
    goMyInfo() {
      wx.navigateTo({
        url: '/my/page/information/personal',
      })
    },
    /*骚一骚*/
    getScancode: function () {
      /* let title = wx.getStorageSync("langIndex") ? "Only merchant accounts can use this feature" :"只有商户账号才能使用此功能"
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
      })
      return; */
      var that = this;
      // 允许从相机和相册扫码
      wx.scanCode({
        success: (res) => {
          console.log(res);
          var result = res.result;
          let title = wx.getStorageSync("langIndex") ? "Wrong coupon" : "优惠券有误"
          if (!result || result == "") {
            wx.showToast({
              title: title,
              icon: 'none',
              duration: 2000
            })
          } else {
            /*商家销毁优惠券*/
            wx.request({
              url: app.globalData.url + 'index.php?app=nyms_coupon&act=writeOffCouponForStore',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              data: {
                user_id: wx.getStorageSync('user_id'),
                coupon_user_id: result
              },
              success: function (res) {
                if (res.data.done) {
                  wx.showToast({
                    title: res.data.retval,
                    icon: 'none',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              },
              fail: function (err) {
                let title = wx.getStorageSync("langIndex") ? "A system exception" : "系统异常"
                wx.showToast({
                  title,
                  icon: 'none',
                  duration: 2000
                })
              },
              complete: function (res) {
                console.log(res);
              }
            })
          }
        }
      })
    },
    sureIdent() {
      if (wx.getStorageSync('is_store') == '0' || wx.getStorageSync('is_store') == '' || wx.getStorageSync('is_store') == 0 || wx.getStorageSync('is_store') == 'null' || wx.getStorageSync('is_store') == 'undefined') {
        this.setData({
          is_store: false,
        })
      } else {
        this.setData({
          is_store: true,
        })
      }
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    },
  },
  pageLifetimes: {
    show: function () {
      //app.get_info()
      let sign = wx.getStorageSync('sign') == '0' ? '' : wx.getStorageSync('sign');
      this.setData({
        "portrait": wx.getStorageSync('portrait'),
        'real_name': wx.getStorageSync('real_name'),
        'sign': sign,
        'has_read': wx.getStorageSync('has_read')
      })
      this.sureIdent()
      /* console.log(this.data.is_store) */
      this.setLanguage();
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
