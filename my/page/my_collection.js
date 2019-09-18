// my/page/my_collection.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollect:true,

    renderdata: [],
    isReachBottom: 0,
    startAll: 0,
    test: "",

    isEng: false,
    language: '',
    languages: ['简体中文', 'English'],
    langIndex: 0,

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
      cOre: wx.getStorageSync('langIndex'),
      start: 0,
    },
  },
 
  renderRealBody(data) {
    data.forEach((v, i) => {
      //console.log(typeof(v.coupon_str),typeof(v.tags_str))
      //判断优惠券的类型是不是string
      if (typeof (v.coupon_str) == "string" && typeof (v.coupon_str2) == "string") {
        v.coupon_str = v.coupon_str.split(",")
        v.coupon_str2 = v.coupon_str2.split(",")

        v.showCoupon_str = [...v.coupon_str]
        v.showCoupon_str2 = [...v.coupon_str2]
        //console.log(v.coupon_str,v.showCoupon_str)
        //v.coupon_str.length>2?v.showCoupon_str.length=2:
        if (v.coupon_str.length > 2) {
          v.showCoupon_str.length = 2
        }
        if (v.coupon_str2.length > 2) {
          v.coupon_str2.length = 2
        }

      } else {
        //console.log(`第${i}个店的优惠券coupon_str为空`)
        v.coupon_str = []
        v.coupon_str2 = []
      }

      if (typeof (v.tags_str) == "string" && typeof (v.tags_str2) == "string" && v.tags_str.length > 0 && v.tags_str2.length > 0) {
        v.tags_str = v.tags_str.split(",")
        v.tags_str2 = v.tags_str2.split(",")

        v.showTags_str = [...v.tags_str]
        v.showTags_str2 = [...v.tags_str2]
        if (v.tags_str.length > 2) {
          v.showTags_str.length = 2
        }
        if (v.tags_str2.length > 2) {
          v.showTags_str2.length = 2
        }
      } else {
        v.tags_str = []
        v.tags_str2 = []
        //console.log(`第${i}个店的标签tags_str为空`)
      }

      if (v.distance2 > 1000) {
        v.showDistance = parseInt(v.distance2 / 1000) + "km"
      } else {
        v.showDistance = parseInt(v.distance2) + "m"
      }
    })
    return data
  },
  getAllStores(data) {
    let that = this
    let title = wx.getStorageSync("langIndex") ? "Loading" : "正在加载数据"
    wx.showLoading({
      title,
    })
    wx.request({
      url: `${app.globalData.url}/index.php?app=nyms_homepage&act=getAllStore`,
      data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res)
        if (res.data.done) {
          let realData = that.renderRealBody(res.data.retval)//要渲染的数据
          let arr = [...that.data.renderdata]
          realData.forEach(v => { arr.push(v) })
          //console.log(realData,120)
          debugger
          that.setData({
            renderdata: arr
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
  fromChild(e) {
    console.log(e.detail, 130)
    this.setData({
      getAllArgu: e.detail,
      renderdata: [],
      startAll: 0,
      "getAllArgu.start": 0//复杂类型的数据，需要清空一下
    })
    this.getAllStores(this.data.getAllArgu)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'getAllArgu.lat': wx.getStorageSync('lat'),
      'getAllArgu.lng': wx.getStorageSync('lng'),
      'getAllArgu.cOre': wx.getStorageSync("langIndex")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
    this.setData({
      /* isReachBottom: ++this.data.isReachBottom, */
      startAll: this.data.startAll + 10,
      "getAllArgu.start": this.data.startAll + 10
    })
    console.log(this.data.getAllArgu)
    this.getAllStores(this.data.getAllArgu)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})