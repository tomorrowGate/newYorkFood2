// find/components/swiper_ver.js
const app = getApp()
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
      datas: [],
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_hot_message: function () {
      //获取热点公告
      var that = this;
      var messages = [];
      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=hot_message',
        method: 'GET',
        data: {
          'hello': 'world',
        },
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          console.log(res, 'hot');
          var messagedata = res.data.retval;
          // messagedata.forEach(function (item, i) {
          //   var message = [];
          //   message.push(item.title);
          //   message.push(item.article_id);
          //   messages.push(message);
          // })

          that.setData({
            'swiperVerticle.datas': messagedata
          })
          console.log(that.data.swiperVerticle.datas);
        },
        fail: function (err) {
          console.log(err);
        }
      })
    },
  },
  pageLifetimes: {
    show: function () {
      this.get_hot_message()
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
