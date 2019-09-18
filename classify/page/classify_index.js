// classify/page/classify_index.js
let app = getApp()
import event from '../../utils/event'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    renderdata:[],
    isReachBottom:0,
    startAll:0,
    nodata:"",
    imgsrc:"",
    test:"",

    isEng:false,
    language: '',
    languages: ['简体中文', 'English'],
    langIndex: 0,

    getAllArgu: {
      is_search: 0,
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lng'),
      user_id: wx.getStorageSync('user_id'),

      tag_id: 0,
      sort: 0,
      city: 0,
      onlyhascoupon: 0,
      onlynew: 0,
      onlyFullReduce: 0,
      scategory: 0,
      search_str: 0,

      start: 0,
      cOre: wx.getStorageSync("langIndex")
    },
  },
  switch1Change(e){
    this.setData({
      isEng: e.detail.value
    })
    let index = e.detail.value?1:0;
    this.setData({	
      langIndex: index
    });
    wx.T.setLocaleByIndex(index);
    this.setLanguage();
    event.emit('languageChanged');

    wx.setStorageSync( 'langIndex', this.data.langIndex)
    
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },
  renderRealData(e){
    console.log(e.detail)
    this.setData({
      renderdata: e.detail.realData,
      fnName: e.detail.funName
    })
  },
  showLoad(){
    let title = wx.getStorageSync("langIndex") ? "Loading" :"正在加载数据"
    wx.showLoading({
      title,
    })
  },
  hideLoad(){
    wx.hideLoading()
  },
  renderRealBody(data) {
    data.forEach((v, i) => {
      //console.log(typeof (v.coupon_str), typeof (v.coupon_str) == "string")
      //判断优惠券的类型是不是string  
      if (typeof (v.coupon_str) == "string" ) {
        v.coupon_str = v.coupon_str.split(",")
        /* v.coupon_str2 = v.coupon_str2.split(",") */

        v.showCoupon_str = [...v.coupon_str]
        /* v.showCoupon_str2 = [...v.coupon_str2] */
        //console.log(v.coupon_str,v.showCoupon_str)
       /*  v.coupon_str.length > 2 ? v.showCoupon_str.length = 2 : v.showCoupon_str.length  */
        if (v.coupon_str.length > 2) {
          v.showCoupon_str.length = 2
        }
        /* if (v.coupon_str2.length > 2) {
          v.coupon_str2.length = 2
        } */

      } else {
        //console.log(`第${i}个店的优惠券coupon_str为空`)
        v.coupon_str = []
        v.coupon_str2 = []
      }

      if (typeof (v.tags_str) == "string" && v.tags_str.length > 0 ) {
        v.tags_str = v.tags_str.split(",")
        /* v.tags_str2 = v.tags_str2.split(",") */

        v.showTags_str = [...v.tags_str]
        /* v.showTags_str2 = [...v.tags_str2] */
        if (v.tags_str.length > 2) {
          v.showTags_str.length = 2
        }
        /* if (v.tags_str2.length > 2) {
          v.showTags_str2.length = 2
        } */
      } else {
        v.tags_str = []
        /* v.tags_str2 = [] */
        //console.log(`第${i}个店的标签tags_str为空`)
      }

      if (v.distance2=="未知"){
        v.showDistance = ""
      }else {
        v.showDistance = parseFloat(v.distance2 * 0.0006214).toFixed(2) + "mi"
      }
    })
    return data
  },
  getAllStores(data) {
    let that = this
    let title = wx.getStorageSync("langIndex") ? "Loading" : "正在加载数据"
    wx.showLoading({
      title,
    })
    wx.request({
      url: `${app.globalData.url}/index.php?app=nyms_homepage&act=getAllStore`,
      data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res,139)
        if (res.data.done) {
         
          let realData = that.renderRealBody(res.data.retval)//要渲染的数据
          if ([...res.data.retval].length==0) {
            that.setData({
              startAll: that.data.startAll - 10,
              "getAllArgu.start": that.data.startAll - 10
            })
          }
          let arr = [...that.data.renderdata]
          realData.forEach(v => { arr.push(v) })

          if (arr.length <= 0) {
            let nodata = wx.getStorageSync("langIndex") ? "Temporarily no data" : "暂无搜索数据"
            that.setData({
              nodata,
              imgsrc:"/src/img/nodataSearch.jpg"
            })
          }else{
            that.setData({
              nodata:"",
              imgsrc:""
            })
          }

          //console.log(realData,120)
          that.setData({
            renderdata: arr
          })
        }
        wx.hideLoading()
      },
      fail(err) {
        console.log(err)
      },
      complete(data) {
        //console.log(data)
      }
    })
  }, 
  fromChild(e){
    console.log(e.detail,161)
    let data = e.detail
    this.setData({
      /* getAllArgu: e.detail, */
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lng'),
      renderdata:[],
      startAll:0,
      "getAllArgu.start":0,//复杂类型的数据，需要清空一下
      "getAllArgu.is_search": 1,
      'getAllArgu.user_id': wx.getStorageSync('user_id'),
    })

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        this.data.getAllArgu[key] = element
        this.setData({
          "getAllArgu": this.data.getAllArgu
        })
      }
    }
    console.log(this.data.getAllArgu)
    this.getAllStores(this.data.getAllArgu)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      renderdata: [],
      langIndex: wx.getStorageSync('langIndex'),
      'getAllArgu.cOre': wx.getStorageSync("langIndex"),
      'getAllArgu.lat': wx.getStorageSync('lat'),
      'getAllArgu.lng': wx.getStorageSync('lng'),
      'getAllArgu.user_id': wx.getStorageSync('user_id'),
    });
    this.setLanguage();
    this.getAllStores(this.data.getAllArgu)
    console.log(this.data.getAllArgu, 221)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.toClassifyStoreId)
    if (app.globalData.toClassifyStoreId == app.globalData.clickStoreId){
      console.log("要加收藏")
      let renderdata = this.data.renderdata
      renderdata.forEach((v,i)=>{
        if (v.store_id == app.globalData.toClassifyStoreId){
          if(v.has_collect != 0){
            v.has_collect = 0
          }else{
            v.has_collect = 1
          }
        }
      })
      this.setData({
        renderdata,
      })
    }

    if (wx.getStorageSync("lat") && wx.getStorageSync("lng") && !wx.getStorageSync('freshBtn2')) {
      this.onLoad()
      wx.setStorageSync('freshBtn2', true)
    }

    let title = wx.getStorageSync('langIndex') == 0 ? "分类" : "Category"
    wx.setNavigationBarTitle({
      title,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.toClassifyStoreId = -2
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
      startAll: this.data.startAll+10,
      "getAllArgu.start": this.data.startAll + 10
    })
    //console.log('底部')
    this.getAllStores(this.data.getAllArgu)

  },

})