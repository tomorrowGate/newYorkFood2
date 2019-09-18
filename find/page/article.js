// find/page/article.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article_result:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.article_id);
    this.getArticleInfoById(options.article_id)
  },
  /*获取文章详情*/
  getArticleInfoById(article_id){
    var that=this
    wx.request({
      url: app.globalData.url + 'index.php?app=nyms_homepage&act=getArticleInfoById',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        article_id: article_id,
        cOre: wx.getStorageSync("langIndex")
      },
      success: function (res) {
        if (res.data.done && res.data.retval.content) {
          res.data.retval.content = res.data.retval.content.replace(/\<img/gi, '< img style="max-width:100%;height:auto;width:700rpx;display:block" ')
          res.data.retval.content = res.data.retval.content.replace(/>\<br>\<\/p>/g, '></p >')
          that.setData({
            article_result: res.data.retval
          })
        } else {

        }
      },
      fail: function (err) {

      },
      complete: function (res) {
        console.log(res);
      }
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