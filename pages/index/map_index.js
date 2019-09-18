// pages/index/map_index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: { latitude: "", longitude: "" },
    url:""
  },
  getLocation() {
    app.checkGeo()
    var that = this
    let openid = wx.getStorageSync("openid")
    let isZH = wx.getStorageSync("langIndex")
    //let backStoreId = app.globalData.toClassifyStoreId
    console.log(wx.getStorageSync("openid"))
    wx.getLocation({
      //type: 'wgs84',
      type: 'gcj02',
      altitude: true,
      success: function (res) {
        console.log(res, "res")
        that.setData({
          "globalData.latitude": res.latitude,
          "globalData.longitude": res.longitude,
          url: `https://nyms.wjtxmobile.com/index.php?app=nyms_homepage&act=toMapIndex&lat=${res.latitude}&lng=${res.longitude}&openid=${openid}&isZH=${isZH}`
        })
        wx.setStorageSync("lat", res.latitude);
        wx.setStorageSync("lng", res.longitude);
      },
      fail(err) {
        that.setData({
          url: `https://nyms.wjtxmobile.com/index.php?app=nyms_homepage&act=toMapIndex&isZH=${isZH}`
        })
      },
    })
  },

  getH5Message: function (e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.getLocation()
    if (wx.getStorageSync("lat") && wx.getStorageSync("lng") && !wx.getStorageSync('freshBtn')){
      this.getLocation()
      wx.setStorageSync('freshBtn',true)
      console.log(wx.getStorageSync("lat"),59)
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.toClassifyStoreId = -2
  },
  onPageScroll: function (ev) {
    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})