// find/components/swiper.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiper: {
      type: Object,
      value: {
        imgUrls: [],
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperStatic: {
      indicatorDots: true,
      indicatorColor: "#dedede",
      indicatorActiveColor: "#1f9cfd",
      autoplay: true,
      interval: 4000,
      duration: 1000,
      circular: true,
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_lunbo: function () {
      //获取轮播图
      var that = this;
      //console.log(this.data.imgUrls)
      var brand_id = wx.getStorageSync("brand_id")
      console.log(brand_id)
      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=getLunboByBrand',
        method: 'POST',
        data: {
          brand_id,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          console.log(res, 'swiper')
         /*  var imgdata = res.data.retval;
          that.properties.swiper.imgUrls.length = 0;//先让图片列表清空
          imgdata.forEach(function (item, i) {
            that.properties.swiper.imgUrls.push(app.globalData.url + "" + item.file_path)
            item.file_path = app.globalData.url + "" + item.file_path
          })
          that.setData({
            'swiper.imgUrls': that.properties.swiper.imgUrls,
            'swiper.imgdata': imgdata,
          }) */
        },
        fail: function (err) {
          console.log(res);
        }
      })
    },
    goVr(e) {
      console.log(e.currentTarget.dataset.url, wx.getStorageSync("user_id"))
      if (!e.currentTarget.dataset.url) {
        return;
      }
      wx.navigateTo({
        url: `/pages/link/link?url=${e.currentTarget.dataset.url}&user_id=${wx.getStorageSync("user_id")}&prePath=swiper`,
      })
    },
  },
  pageLifetimes: {
    show: function () {
      this.get_lunbo()
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

