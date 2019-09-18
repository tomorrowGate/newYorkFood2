  // Message/Message.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAct:0,
    start:0,//上拉加载
    now_cate:0,//当前的消息类型
    language: '',
    imgsrc:'',
    nodata:'',
    message_info:[]//消息数组
  },
  
  changTab(e){
    this.setData({
      showAct:e.currentTarget.dataset.argu,
      now_cate: e.currentTarget.dataset.argu,
      start:0,

      message_info:[]
    })
    this.getMessageByCate(this.data.now_cate)
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },
  goMsgDet(options){
    //console.log(options)
    wx.navigateTo({
      url: '/my/page/message_detail?m_id=' + options.currentTarget.dataset.m_id,
    })
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
  onShow: function (options) {
    
    this.getMessageByCate(this.data.now_cate)
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
    this.setData({
      start:this.data.start+10
    })
    this.getMessageByCate(this.data.now_cate)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /*获取各种类型的消息*/
  getMessageByCate(type){
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=nyms_myinfo&act=getMessageByCate',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: wx.getStorageSync("user_id"),
        m_cate:type,
        start:that.data.start,
        cOre: wx.getStorageSync("langIndex")
      },
      success: function (res) {
        console.log(res.data.retval)
        if (res.data.done) {
          that.setData({
            message_info: res.data.retval
          })
          if (res.data.retval.length<=0){
            let nodata = wx.getStorageSync("langIndex") ? "There is no news." : "没有任何消息哦~";
            that.setData({
              imgsrc:"/src/img/nodataMsg.jpg",
              nodata
            })
          }
        } else {

        }
      },
      fail: function (err) {

      },
      complete: function (res) {
        console.log(res);
      }
    })
  }
})