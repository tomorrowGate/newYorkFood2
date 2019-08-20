// pages/index/map_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: { latitude: "", longitude: "" },
    url:""
  },
  getLocation() {
    var that = this
    let openid = wx.getStorageSync("openid")
    wx.getLocation({
      //type: 'wgs84',
      type: 'gcj02',
      altitude: true,
      success: function (res) {
        console.log(res, "res")
        that.setData({
          "globalData.latitude": res.latitude,
          "globalData.longitude": res.longitude,
          url: `https://nyms.wjtxmobile.com/index.php?app=nyms_homepage&act=toMapIndex&lat=${res.latitude}&lng=${res.longitude}&openid=${openid}`
        })
        //var speed = res.speed
        //var accuracy = res.accuracy
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getLocation()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})