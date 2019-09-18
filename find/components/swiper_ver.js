// find/components/swiper_ver.js
let app = getApp()
import event from '../../utils/event'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperVerticle: {
      datas: [],//文章数据
      vertical: true,
      site_description: "",
      hotline: "",

    },
    imgUrls: [],
    imgdata: [],

    indicatorDots: true,
    indicatorColor: "#dedede",
    indicatorActiveColor: "#1f9cfd",
    autoplay: true,
    interval: 4000,
    duration: 1000,
    circular: true,

    language: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_hot_message: function () {
        //获取轮播图
        var that = this;
        wx.request({
          url: `${app.globalData.url}/index.php?app=nyms_homepage&act=getFoodBulletin`,
          data: {
            cOre: wx.getStorageSync("langIndex")
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success(res) {
            console.log(res, 59)
            var messagedata = res.data.retval.article_info;
            if (res.data.done) {
              that.setData({
                'swiperVerticle.datas': messagedata
              })
            }
            wx.hideLoading()
          },
          fail(err) {
            console.log(err)
          },
          complete(data) {
            //console.log(data)
          }
        })
    },
    goHotPage(e){
      var article_id = e.currentTarget.dataset.article_id
      wx.navigateTo({
        url: '/find/page/article?article_id=' + article_id,
      })
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    },
  },
  pageLifetimes: {
    show: function () {
      this.get_hot_message()
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
