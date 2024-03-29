// find/components/find_search.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    realSearch:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchText:"",
    language: '',
    scrollTop: 0,
    getAllArgu: {
      is_search: 0,
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lng'),

      tag_id: 0,
      sort: 0,
      city: 0,
      onlyhascoupon: 0,
      onlynew: 0,
      onlyFullReduce: 0,
      scategory: 0,
      search_str: 0,

      start: 0,
      cOre: wx.getStorageSync("langIndex")
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goRealSearch(){
      wx.navigateTo({
        url: '/classify/page/main_search',
      })
    },
    changeInput(e){
      this.setData({
        searchText:e.detail.value
      })
    },
    scrollTopFun:function(e){
       console.log(e.detail.scrollTop); 
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    },
    searchReal(e) {
      this.setData({
        
        "getAllArgu.is_search": 1,
        "getAllArgu.search_str": this.data.searchText
      })
      let argus = { ...this.data.getAllArgu }
      this.triggerEvent("renderRealData", argus, true)
      return
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    },
  },
  pageLifetimes: {
    show: function () {
      this.setLanguage();	// (1)
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        'getAllArgu.lat': wx.getStorageSync('lat'),
        'getAllArgu.lng': wx.getStorageSync('lng'),
        'getAllArgu.cOre': wx.getStorageSync("langIndex")
      })
      this.setLanguage();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
