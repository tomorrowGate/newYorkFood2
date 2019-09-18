// information/personal.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    portrait:wx.getStorageSync('portrait'),
    real_name: wx.getStorageSync('real_name'),
    phone_mob: wx.getStorageSync('phone_mob'),
    gender: wx.getStorageSync('gender'),
    birthday: wx.getStorageSync('birthday'),
    sign: wx.getStorageSync('sign'),

    language: '',
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },
  goSetinfo(e){
    let type= e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/my/page/my_setinfo?type=${type}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sign = wx.getStorageSync('sign') == '0' ? '' : wx.getStorageSync('sign');
    this.setData({
      langIndex: wx.getStorageSync('langIndex'),
      sign
    });
    this.setLanguage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(123)
    app.get_info()
    .then((res)=>{
      let sign = wx.getStorageSync('sign') == '0' ? '' : wx.getStorageSync('sign');
      let phone_mob = wx.getStorageSync('phone_mob') == '0' ? '' : wx.getStorageSync('phone_mob');
      let gender = wx.getStorageSync('gender') == '0' ? '' : wx.getStorageSync('gender');
      let birthday = wx.getStorageSync('birthday') == '0' ? '' : wx.getStorageSync('birthday');

      this.setData({
        portrait: wx.getStorageSync('portrait'),
        real_name: wx.getStorageSync('real_name'),
        phone_mob,
        gender,
        birthday,
        sign,
      })
    })
    .catch(err=>{console.log(err)})
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