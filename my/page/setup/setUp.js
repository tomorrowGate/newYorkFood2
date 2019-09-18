// setUp/setUp.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: '',
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },
  backHome(){
    wx.clearStorageSync() 
    // wx.reLaunch({
    //   url: '/pages/index/index',
    // })
    wx.switchTab({
      url: '/pages/index/map_index',
    })
  },
  authorizedLocation(){
    app.checkGeo().then((resolve)=>{
      if (resolve) {
        let title = wx.getStorageSync("langIndex") == 0 ? "您已经授权过了地理位置" : "You have authorized geographical location"
        wx.showToast({
          title,
          icon: "none"
        })
      }
    })//true表示授权成功
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      langIndex: wx.getStorageSync('langIndex')
    });
    this.setLanguage();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /*前往文章*/
  goArticle(options) {
    //console.log(options)
    var article_id = options.currentTarget.dataset.article_id
    wx.navigateTo({
      url: '/find/page/article?article_id=' + article_id,
    })
  }
})