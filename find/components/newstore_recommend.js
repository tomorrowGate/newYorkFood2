// find/components/newstore_recommend.js
let app = getApp()
import event from '../../utils/event'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodList:{
      type: Array,
      value: [],
    },
    renderdataNew: {
      type: Array,
      value: [],
      observer() {
        this.setData({
          foodList: app.globalData.renderRealData
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
    realStar: 0,//真·star
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
    language: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goStoreDet(e) {
      //if (e.target.dataset.id == "navigation") return

      let user_id = wx.getStorageSync("user_id")
      let store_id = e.currentTarget.dataset.storeid
      let lat = wx.getStorageSync('lat')
      let lng = wx.getStorageSync('lng')
      let cOre = wx.getStorageSync('langIndex')
      app.globalData.clickStoreId = store_id
      wx.navigateTo({
        url: `/find/page/store_real?user_id=${user_id}&store_id=${store_id}&lat=${lat}&lng=${lng}&cOre=${cOre}`,
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
      this.setLanguage();
    },
  },
  lifetimes: {
    attached: function () {
      this.setData({
        "getAllArgu.sort": 0,
        'getAllArgu.lat': wx.getStorageSync('lat'),
        'getAllArgu.user_id': wx.getStorageSync('user_id'),
        'getAllArgu.lng': wx.getStorageSync('lng'),
        'getAllArgu.cOre': wx.getStorageSync('langIndex'),

        langIndex: wx.getStorageSync('langIndex')
      })
      /* console.log(this.properties.foodList) */
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      app.globalData.toClassifyStoreId = -2
    },
  },
})
