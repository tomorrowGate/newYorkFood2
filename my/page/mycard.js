// my/page/mycard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowDia:true,
    showCardT:0,//已使用0，未使用1，已过期2
    sureUseOne:false,//首次确认
    hasUsed:false
  },
  showUseDia(e){
    this.setData({
      isShowDia:false
    })
  },
  showCardType(e){
    this.setData({
      showCardT:e.currentTarget.dataset.argu
    })
  },
  useitSure(e){
    this.setData({
      hasUsed:true
    })
    this.hideDia()
  },
  useitFirst(e){
    if (this.data.showCardT==0){
      this.setData({
        sureUseOne: true
      })
    }
    else{
      console.log(e)
    }
  },
  hideDia(){
    this.setData({
      isShowDia:true,
      sureUseOne: false,
      hasUsed: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,19)
    this.setData({
      showCardT: options.cardType
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