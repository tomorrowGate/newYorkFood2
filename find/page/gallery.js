// find/page/gallery.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_id:0,
    lunbo_info:[],
    appurl: app.globalData.url,
    imgalist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,"传过来的东西")
    this.setData({
      store_id: options.store_id
    })
    this.getLunboByStore();
    
  },
  /*店铺轮播图信息*/
  getLunboByStore: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=nyms_homepage&act=getLunboByStore',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
       store_id: that.data.store_id,
        cOre: wx.getStorageSync("langIndex")
      },
      success: function (res) {
        if (res.data.done) {
          let data = res.data.retval;
          let map = []
          data.forEach((v,i)=>{
            v.file_path = that.data.appurl + v.file_path
            map.push(v.file_path)
          })
          that.setData({
            'lunbo_info': data,
            imgalist:map
          })
          console.log(that.data.lunbo_info, "店铺详细信息")
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
  previewImage(e){
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
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