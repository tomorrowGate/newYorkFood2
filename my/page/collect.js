// my/page/collect.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollect:true,
    store_info:[],//收藏的店铺数组


    renderdata: [],
    isReachBottom: 0,
    startAll: 0,
    test: "",
    nodata:"",
    imgsrc:"",

    isEng: false,
    language: '',
    languages: ['简体中文', 'English'],
    langIndex: 0,

    getAllArgu: {
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lng'),
      user_id: wx.getStorageSync('user_id'),
      start: 0,
      cOre: wx.getStorageSync('langIndex'),
    },
  },

  renderRealBody(data) {
    data.forEach((v, i) => {
      //console.log(typeof(v.coupon_str),typeof(v.tags_str))
      //判断优惠券的类型是不是string
      if (typeof (v.coupon_str) == "string") {
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
      }

      if (typeof (v.tags_str) == "string"&& v.tags_str.length > 0 ) {
        v.tags_str = v.tags_str.split(",")

        v.showTags_str = [...v.tags_str]
        if (v.tags_str.length > 2) {
          v.showTags_str.length = 2
        }
      } else {
        v.tags_str = []
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
      url: `${app.globalData.url}/index.php?app=nyms_myinfo&act=getMyCollectStore`,
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
          if (arr.length <= 0) {
            let nodata = wx.getStorageSync("langIndex") ? "There is no collection." : "没有任何收藏哦~";
            that.setData({
              nodata,
              imgsrc:"/src/img/nodataCollect.jpg",
            })
          } else {
            that.setData({
              nodata: "",
            })
          }
          //console.log(realData,120)
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
  cancelCollect(e){
    let item_id = e.detail
    let that = this
    let title = wx.getStorageSync("langIndex") ? "Loading" : "正在加载数据"
    wx.showLoading({
      title,
    })
    wx.request({
      url: `${app.globalData.url}/index.php?app=nyms_myinfo&act=cancelCollect `,
      data:{
        user_id: wx.getStorageSync('user_id'),
        item_id,
        cOre:wx.getStorageSync('langIndex')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res)
        if (res.data.done) {
          that.setData({
            renderdata:[]
          })
          that.getAllStores(that.data.getAllArgu)

          /* let realData = that.renderRealBody(res.data.retval)//要渲染的数据
          let arr = [...that.data.renderdata]
          realData.forEach(v => { arr.push(v) })
          //console.log(realData,120)
          that.setData({
            renderdata: arr,
          }) */
        }
      },
      fail(err) {
        console.log(err)
      },
      complete(data) {
        //console.log(data)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'getAllArgu.lat': wx.getStorageSync('lat'),
      'getAllArgu.lng': wx.getStorageSync('lng'),
      'getAllArgu.cOre': wx.getStorageSync("langIndex"),
      'getAllArgu.user_id': wx.getStorageSync("user_id")
    })
    console.log(this.data.getAllArgu)
    this.getAllStores(this.data.getAllArgu)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /* console.log("上拉加载")
    this.setData({
      start: this.data.start+10
    })
    this.getMyCollectStore(); */

    this.setData({
      /* isReachBottom: ++this.data.isReachBottom, */
      startAll: this.data.startAll + 10,
      "getAllArgu.start": this.data.startAll + 10
    })
    //console.log(this.data.getAllArgu)
    this.getAllStores(this.data.getAllArgu)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})