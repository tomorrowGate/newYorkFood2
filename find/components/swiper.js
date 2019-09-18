// find/components/swiper.js
let app = getApp()
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
    },
    lunbo_info: {
      type: Array,
      value:[],
      observer:function (){
        //console.log(this.properties.lunbo_info)
      }
    },
    appurl:{
      type: String,
      value: app.globalData.url,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperStatic: {
      indicatorDots: false,
      indicatorColor: "rgba(255,255,255,0.6)",
      indicatorActiveColor: "#fff",
      autoplay: true,
      interval: 4000,
      duration: 1000,
      circular: true,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goVr(options){
      if (options.currentTarget.dataset.link2 != "0" && options.currentTarget.dataset.link2 != "undefined") {
        var link2 = options.currentTarget.dataset.link2
        wx.navigateTo({
          url: '/find/page/gongzhonghao?link2=' + link2,
        })
      } 
    },
    get_lunbo: function () {
      //获取轮播图
      var that = this;
      wx.request({
        url: `${app.globalData.url}/index.php?app=nyms_homepage&act=getFoodBulletin`,
        data:{
          cOre: wx.getStorageSync("langIndex")
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res) {
          console.log(res,59)
          if (res.data.done) {
            that.setData({
              'lunbo_info': res.data.retval.lunbo_info,
            })
          }
          console.log(that.data.lunbo_info, 65)
        },
        fail(err) {
          console.log(err)
        },
        complete(data) {
          //console.log(data)
        }
      })
    },
  },
  pageLifetimes: {
    show: function () {
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      var pages = getCurrentPages();
      var curPages = pages[pages.length - 1].route;
      //console.log(curPages)
      if (curPages == 'find/page/find_index') {
        this.get_lunbo()
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})

