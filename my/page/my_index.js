// my/page/my_index.js
let app = getApp();
import event from '../../utils/event'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLanActive: false,//是否超出隐藏
    selectItem: "",
    user_id:"",

    isEng: false,
    language: '',
    languages: ['简体中文', 'English'],
    langIndex: 0,
  },
  showLang() {
    this.setData({
      isLanActive: true
    })
  },
  hideLang(e) {
    let index = e.currentTarget.dataset.value ? 1 : 0;
    this.setData({
      selectItem: e.currentTarget.dataset.name,
      isLanActive: false,
      isEng: e.currentTarget.dataset.value,

      langIndex: index
    })
    wx.T.setLocaleByIndex(index);
    this.setLanguage();
    event.emit('languageChanged');
    wx.setStorageSync('langIndex', this.data.langIndex)
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
    app.get_info();
    let selectItem = wx.getStorageSync("langIndex")==0?"中文":"English"
    this.setData({
      selectItem,
    })
  },

  onShow: function () {
    this.setData({
      user_id:wx.getStorageSync("user_id")
    })
    let title = wx.getStorageSync('langIndex') == 0 ? "纽约美食地图" : "FoodMapNYC"
    wx.setNavigationBarTitle({
      title,
    })
    if (!wx.getStorageSync("user_id")){
      /**/
      let title = wx.getStorageSync("langIndex") == 0 ? "登录授权" : "Login"
      let content = wx.getStorageSync("langIndex") == 0 ? "您还没有登录授权，是否登录" : "You haven't logged in yet. Do you logon or not?"
      let cancelText = wx.getStorageSync("langIndex") == 0 ? "取消" : "No"
      let confirmText = wx.getStorageSync("langIndex") == 0 ? "确定" : "Yes"
      wx.showModal({
        title,
        content,
        showCancel:true,
        cancelText,
        confirmText,
        success: function (res) {
          if (res.cancel) {
            wx.switchTab({
              url: '/pages/index/map_index',
            })
          } else {
            //点击确定
            wx.navigateTo({
              url: '/pages/index/index',
            }) 
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
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