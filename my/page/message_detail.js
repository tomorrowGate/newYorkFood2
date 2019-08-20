// pica/pages/pica_service/pica_serviceDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '0',
    title: "",
    time: "",
    content: "",
    isBrandOrUni: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.a_id) {
      console.log("---");
      let a_id = JSON.parse(options.a_id);
      console.log("---" + a_id);
      this.get_article(a_id);
    } else {
      console.log(options.type)
      wx.setNavigationBarTitle({
        title: options.name
      })
      this.get_article(0, options.type);
    }
    wx.setNavigationBarTitle({
      title: options.title
    })
  },
  get_article: function (a_id, type) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_article_info',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        a_id: a_id,
        type: type,

      },
      success: function (res) {
        //console.log(res);
        var content = res.data.retval.content
        //console.log(content,'reg')
        content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;width:700rpx;display:block" ')
        content = content.replace(/>\<br>\<\/p>/g, '></p>')
        //console.log(content,59)
        if (a_id == 0) {
          /* content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;width:700rpx;display:block" ') */
          that.setData({
            title: '',
            time: '',
            content: content,
            isBrandOrUni: true
          });
        } else {
          that.setData({
            title: res.data.retval.title,
            time: app.formatDateTime(res.data.retval.add_time, 0),
            content: content,
            isBrandOrUni: false
          });
        }
        wx.hideLoading();

      },
      fail: function (err) {
        console.log(err);
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
})