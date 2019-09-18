// find/page/find_index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realSearch:false,

    globelUrl: app.globalData.url,
    renderdata: [],
    realStar: 0,//真·star
    startAll:0,
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
  goGallery(){
    console.log(123)
    wx.navigateTo({
      url: '/find/page/gallery',
    })
  },
  renderRealBody(data) {
    data.forEach((v, i) => {
      //console.log(typeof(v.coupon_str),typeof(v.tags_str))
      //判断优惠券的类型是不是string
      if (typeof (v.coupon_str) == "string" ) {
        v.coupon_str = v.coupon_str.split(",")

        v.showCoupon_str = [...v.coupon_str]
        //console.log(v.coupon_str,v.showCoupon_str)
        //v.coupon_str.length>2?v.showCoupon_str.length=2:
        if (v.coupon_str.length > 2) {
          v.showCoupon_str.length = 2
        }

      } else {
        //console.log(`第${i}个店的优惠券coupon_str为空`)
        v.coupon_str = []
        v.coupon_str2 = []
      }

      if (typeof (v.tags_str) == "string" && v.tags_str.length > 0 ) {
        v.tags_str = v.tags_str.split(",")

        v.showTags_str = [...v.tags_str]
        if (v.tags_str.length > 2) {
          v.showTags_str.length = 2
        }
      } else {
        v.tags_str = []
        //console.log(`第${i}个店的标签tags_str为空`)
      }

      if (v.distance2 == "未知") {
        v.showDistance = ""
      } else {
        v.showDistance = parseFloat(v.distance2 * 0.0006214).toFixed(2) + "mi"
      }
    })
    return data
  },
  getAllStores(data) {
    let that = this
    /* let title = wx.getStorageSync("langIndex") ? "Loading" : "正在加载数据"
    wx.showLoading({
      title,
    }) */
    wx.request({
      url: `${app.globalData.url}/index.php?app=nyms_homepage&act=getFindStore`,
      data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res,91)
        //return
        if (res.data.done) {
          let realData = that.renderRealBody(res.data.retval)//要渲染的数据
          let arr = [...that.data.renderdata]
          realData.forEach(v => { arr.push(v) })
          //console.log(realData,120)
          app.globalData.renderRealData = arr
          that.setData({
            renderdata: arr
          })
        }
        //wx.hideLoading()
      },
      fail(err) {
        console.log(err)
      },
      complete(data) {
        //console.log(data)
      }
    })
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },
  fromChild(e){
    this.setData({
      'getAllArgu.sort': e.detail-1,
      renderdata: [],
      startAll: 0,
      "getAllArgu.start": 0//复杂类型的数据，需要清空一下
    })
    console.log(this.data.getAllArgu)
    this.getAllStores(this.data.getAllArgu)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.fromShare){
      let user_id = wx.getStorageSync("user_id")
      let store_id = options.store_id
      let lat = wx.getStorageSync('lat')
      let lng = wx.getStorageSync('lng')
      let cOre = wx.getStorageSync('langIndex')
      wx.navigateTo({
        url: `/find/page/store_real?user_id=${user_id}&cOre=${cOre}&store_id=${store_id}&lat=${lat}&lng=${lng}`,
      })
    }
    this.setData({
      'getAllArgu.lat': wx.getStorageSync("lat"),
      'getAllArgu.lng': wx.getStorageSync("lng"),
      'getAllArgu.user_id': wx.getStorageSync("user_id"),
      'getAllArgu.cOre': wx.getStorageSync("langIndex")
    })
    this.getAllStores(this.data.getAllArgu)
    if (options.prepath =="/find/page/store_real"){
      wx.navigateTo({
        url: 'options.prepath',
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      'getAllArgu.cOre': wx.getStorageSync("langIndex")
    })
    this.setLanguage()
    console.log(app.globalData.toClassifyStoreId == app.globalData.clickStoreId)
    if (app.globalData.toClassifyStoreId == app.globalData.clickStoreId) {
      let renderdata = this.data.renderdata
      renderdata.forEach((v, i) => {
        if (v.store_id == app.globalData.toClassifyStoreId) {
          if (v.has_collect != 0) {
            v.has_collect = 0
          } else {
            v.has_collect = 1
          }
        }
      })
      app.globalData.renderRealData = renderdata
      this.setData({
        renderdata,
      })
    }


    let title = wx.getStorageSync('langIndex') == 0 ? "发现" : "Discover"
    wx.setNavigationBarTitle({
      title,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.toClassifyStoreId = -2
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      /* isReachBottom: ++this.data.isReachBottom, */
      startAll: this.data.startAll + 10,
      "getAllArgu.start": this.data.startAll + 10
    })
    console.log(this.data.getAllArgu)
    this.getAllStores(this.data.getAllArgu)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})