// classify/page/main_search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realSearch:true
  },

  renderRealData(e){
    console.log(e.detail,12)
    // let pages = getCurrentPages();
    // let prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    // prevPage.setData({
    //   test: e.detail
    // })
    let search = e.detail.search_str
    wx.navigateTo({
      url: `/classify/page/classify_searchDet?search=${search}`,
    })
    //console.log(prevPage.data)
    /* wx.navigateBack({
      delta: 1,
    }) */
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