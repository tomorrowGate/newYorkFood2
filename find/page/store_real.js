// find/page/store_real.js
let app = getApp()
import event from '../../utils/event'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSkeleton: true,

    article_info:[],
    coupon_info: [],
    lunbo_info: [],
    store_info: {},
    tag_info: [],
    video_info: [],
    tuijian_info:{},
    lunbo_count:0,
    store_id:0,
    scrollTop: 0,
    language: '',

    prevData:{
      user_id:wx.getStorageSync("user_id"),
      store_id:0,
      lat:0,
      lng:0,
      cOre: wx.getStorageSync("langIndex")
    },

    toView:""
  },
  scrollTopFun: function (e) {//监听页面滚动
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#storeCoupon').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      if (res[0].top <= 0){
        that.setData({
          scrollTop: true
        })
      }else{
        that.setData({
          scrollTop: false
        })
      }
    })
   
  },
  goGallery(){
    var that=this;
    wx.navigateTo({
      url: '/find/page/gallery?store_id=' + that.data.store_id,
    })
  },
  jumpTo(e){
    let target = e.currentTarget.dataset.opt;
  
    this.setData({
      toView: target
    })
    console.log(this.data.toView,34)
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
    //'/find/page/store_real'
    console.log(options,41)
    this.setData({
      prevData: options,
    })
    this.getStoreDetailedInformation();

    this.setData({
      langIndex: wx.getStorageSync('langIndex')
    });
    this.setLanguage();
  },
  /*店铺详细信息*/
  getStoreDetailedInformation:function (){
    var that=this;
    var reqData = {...this.data.prevData}
    reqData.user_id=wx.getStorageSync('user_id');
    reqData.lng = wx.getStorageSync('lng');
    reqData.lat = wx.getStorageSync('lat');
    reqData.cOre = wx.getStorageSync('langIndex')

    console.log(reqData,57)
    wx.request({
      url: app.globalData.url + 'index.php?app=nyms_homepage&act=getStoreDetailedInformation',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: reqData,
      success: function (res) {
        if (res.data.done) {
          var data = res.data.retval;
          let store_info = {...data.store_info}
          if (store_info.distance == "未知"){
            store_info.distance = ""
          }else{
            store_info.distance = parseFloat(store_info.distance * 0.0006214).toFixed(2) + "mi"
          }
          
          if (store_info.business_hours && store_info.business_hours.length>0){
            let reg = /\n/g
            store_info.business_hours = store_info.business_hours.replace(/\n/g, "<br/>")
          }
          that.setData({
            'article_info': data.article_info,
            'coupon_info': data.coupon_info,
            'lunbo_info': data.lunbo_info,
            'store_info': store_info,
            'tag_info': data.tag_info,
            'video_info': data.video_info,
            'lunbo_count':data.lunbo_info.length,
            'tuijian_info': data.tuijian_info,
            store_id: data.store_info.store_id
          })
          /* setTimeout(()=>{
            that.setData({
              showSkeleton: false
            })
          },2000)  */
          console.log(res.data.retval,"店铺详细信息")
          console.log(store_info.business_hours)
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

  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setLanguage();	// (1)
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
    //app.globalData.toClassifyStoreId = 180
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
    let store_id = this.data.prevData.store_id
    return {
      path: `/find/page/find_index?fromShare=${true}&store_id=${store_id}`,
    }
  }
})