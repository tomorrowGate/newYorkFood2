// my/page/mycard.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowDia:true,
    showCardT:0,//已使用0，未使用1，已过期2
    sureUseOne:false,//首次确认
    hasUsed:false,
    coupon_result:[],//优惠券数组
    coupon_result:{},//单条优惠券信息
    appurl: app.globalData.url,
    nodata:"",
    imgsrc:"",
    timer:null,

    dia_coupon_result:{},
    language: '',
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },
  showUseDia(e){
    //debugger
    console.log(e);
    let that = this
    /* let timer = setInterval(()=>{
      that.getCouponByType(that.data.showCardT)
    },1000) */
    this.setData({
      isShowDia:false,
      dia_coupon_result: e.currentTarget.dataset.coupon_result
    })
    
    console.log(this.data.coupon_result)
  },
  showCardType(e){
    this.setData({
      showCardT:e.currentTarget.dataset.argu,
      coupon_result:[]
    })
    this.getCouponByType(e.currentTarget.dataset.argu)
  },
  /*确定使用优惠券  自行销毁优惠券*/
  useitSure(e){
    this.setData({
      hasUsed:true
    })
    //console.log(e.currentTarget.dataset.cu_id)
    var cu_id = e.currentTarget.dataset.cu_id
    if (cu_id>0){
      var that = this;
      wx.request({
        url: app.globalData.url + 'index.php?app=nyms_coupon&act=writeOffCouponForOneself',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          user_id: wx.getStorageSync("user_id"),
          coupon_user_id: cu_id,
          cOre: wx.getStorageSync('langIndex')
        },
        success: function (res) {
          console.log(res,70)
          if (res.data.done) {
            that.getCouponByType(that.data.cardType)
            that.hideDia()
          } else {
            
          }
        },
        fail: function (err) {

        },
        complete: function (res) {
          console.log(res);
          if (!res.data.done){
            wx.showToast({
              title: res.data.msg,
              icon:"none"
            })
            that.getCouponByType(that.data.cardType)
            that.hideDia()
          }
        }
      })
    }
  },
  /*点击立即使用后再点立即使用*/
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
      showCardT: options.cardType,
      langIndex: wx.getStorageSync('langIndex')
    })
    this.getCouponByType(options.cardType)
    this.setLanguage();
  },
  /*根据类型获取优惠券信息*/
  getCouponByType(type){
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=nyms_coupon&act=getCouponByType',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        type:type,
        user_id:wx.getStorageSync("user_id"),
        lat: wx.getStorageSync("lat"),
        lng: wx.getStorageSync("lng"),
        
        cOre: wx.getStorageSync("langIndex")
      },
      success: function (res) {
        console.log(res,134)
        if (res.data.done) {
          let arr = res.data.retval
          arr.forEach(v=>{
            if (v.distance == "未知") {
              v.distance  = ""
            } else {
              v.distance = parseFloat(v.distance * 0.0006214).toFixed(2) + "mi"
            }
          })
          that.setData({
            coupon_result: arr
          })
          if (arr.length<=0){
            let nodata = wx.getStorageSync("langIndex") ? "Temporarily no coupons" : "没有相关优惠券哦~"
            that.setData({
              nodata,
              imgsrc:"/src/img/nodataCoups.jpg"
            })
          }else{
            that.setData({
              nodata:"",
              imgsrc: ""
            })
          }
          console.log(that.data.coupon_result)
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
  /*自行销毁优惠券*/
  writeOffCouponForOneself(cu_id){
    
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