// pages/link/link.js
let app = getApp()
import event from '../../utils/event'

let QQMapWX = require('../../utils//qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true ,
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
    console.log(options,15)
    if (options.isLan){
      let i = parseInt(options.isLan)
      wx.T.setLocaleByIndex(i)
      this.setLanguage();
      event.emit('languageChanged');
      wx.setStorageSync('langIndex', i)

      wx.reLaunch({
        url: '/pages/index/map_index',
      })
    }
    if (options.addr){
      
      let { addr, cuslat, cuslng } = options;
      let that = this
      //console.log(wx.getSetting)
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          wx.openLocation({
            latitude: parseFloat(cuslat),
            longitude: parseFloat(cuslng),
            scale: 28,
            name: addr, //打开后显示的地址名称
          })
        }
      })
      wx.reLaunch({
        url: '/pages/index/map_index',
      })
    }
   
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