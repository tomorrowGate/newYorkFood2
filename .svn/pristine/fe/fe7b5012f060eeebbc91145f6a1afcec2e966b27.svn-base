// classify/page/classify_link.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:""
  },
  getLocation(cuslat, cuslng, store_id) {
    //console.log(store_id)
    var that = this
    let openid = wx.getStorageSync("openid")
    console.log(cuslat, cuslng, store_id)
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function (res) {
        console.log(res, "res")
        that.setData({
          url: `https://nyms.wjtxmobile.com/index.php?app=nyms_homepage&act=toAutopilot&lat=${res.latitude}&lng=${res.longitude}&cuslat=${cuslat}&cuslng=${cuslng}&store_id=${store_id}`
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let cuslat = options.cuslat
    let cuslng = options.cuslng
    let store_id = options.store_id
    this.getLocation(cuslat, cuslng,store_id)
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

  },

})