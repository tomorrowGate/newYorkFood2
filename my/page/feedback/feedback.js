// feedback/feedback.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    information:"",
    language: '',
    canClick: true//提交按钮是否有效
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
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
  /*设置内容*/
  conentInput(e){
    this.setData({
      content: e.detail.value
    })
  },
  /*设置联系方式*/
  informationInput(e){
    this.setData({
      information: e.detail.value
    })
  },
  /*提交意见*/
  addOpinions(e){
    var that = this;
    let title = wx.getStorageSync("langIndex") ? "submiting" : "正在提交"
    let titleErr = wx.getStorageSync("langIndex") ? "Opinions and contact information cannot be empty" : "意见和联系方式不能为空"
    let systemErr = wx.getStorageSync("langIndex") ? "A system exception" : "系统异常"
    if (!that.data.content || !that.data.information) {
      wx.showToast({
        title: titleErr,
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title,
      mask: true,
    })
    wx.request({
      url: app.globalData.url + 'index.php?app=nyms_myinfo&act=addOpinions',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: wx.getStorageSync("user_id"),
        content:that.data.content,
        phone_mob: that.data.information,
        cOre: wx.getStorageSync("langIndex")
      },
      success: function (res) {
        if (res.data.done) {
          that.setData({
            canClick: false
          })
          wx.hideLoading()
          wx.showToast({
            title: res.data.retval,
            icon: 'none',
            duration: 2000
          })
          
          let timer = setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (err) {
        wx.showToast({
          title: systemErr,
          icon: 'none',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log(res);
      }
    })
  }
})