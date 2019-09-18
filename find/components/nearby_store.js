// find/components/nearby_store.js
let app= getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    renderdataNear: {
      type: Array,
      value: [],
      observer() {
        this.setData({
          renderdata: app.globalData.renderRealData
        })
      }
    },
    language: {
      type: Object,
      value: wx.T.getLanguage(),
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    globelUrl: app.globalData.url,
    renderdata:[],
    getAllArgu: {
      sort: 0,
      search_str: '',
      start: 0,
      end: '',
      lat: wx.getStorageSync("lat"),
      lng: wx.getStorageSync("lng"),
      user_id: wx.getStorageSync("user_id"),
      cOre: wx.getStorageSync("langIndex")
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    renderRealDataNear(e) {
      console.log(e.detail)
      this.setData({
        renderdata: e.detail.realData,
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
      this.setData({
        "getAllArgu.sort": 1,
        "getAllArgu.user_id": wx.getStorageSync('user_id'),
        'getAllArgu.lat': wx.getStorageSync('lat'),
        'getAllArgu.lng': wx.getStorageSync('lng'),
        'getAllArgu.cOre': wx.getStorageSync('langIndex')
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
