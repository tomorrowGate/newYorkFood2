// my/page/blackcard.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    portrait: wx.getStorageSync('portrait'),
    real_name: wx.getStorageSync('real_name'),
    phone_mob: wx.getStorageSync('phone_mob'),
    gender: wx.getStorageSync('gender'),
    birthday: wx.getStorageSync('birthday'),
    sign: wx.getStorageSync('sign'),
    Equity: wx.getStorageSync('Equity'),
    note: wx.getStorageSync('note'),

    language: '',
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
      portrait: wx.getStorageSync('portrait'),
      real_name: wx.getStorageSync('real_name'),
      phone_mob: wx.getStorageSync('phone_mob'),
      gender: wx.getStorageSync('gender'),
      birthday: wx.getStorageSync('birthday'),
      sign: wx.getStorageSync('sign'),
      Equity: wx.getStorageSync('Equity'),
      note: wx.getStorageSync('note'),
      
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

  }
})