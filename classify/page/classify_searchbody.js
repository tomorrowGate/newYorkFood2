// classify/page/classify_index.js
let app = getApp()
import event from '../../utils/event'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    renderdata: [],
    isReachBottom: 0,
    startAll: 0,
    language: '',
    nodata:"",
    imgsrc:"",

    getAllArgu: {
      sort: 0,
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lng'),
      start: 0,
      user_id: wx.getStorageSync('user_id'),
      cOre: wx.getStorageSync("langIndex")
    },

  },
  renderRealData(e) {
    console.log(e.detail)
    this.setData({
      renderdata: e.detail.realData,
      fnName: e.detail.funName
    })
  },
  showLoad() {
    let title = wx.getStorageSync("langIndex") ? "Loading" : "正在加载数据"
    wx.showLoading({
      title,
    })
  },
  hideLoad() {
    wx.hideLoading()
  },
  renderRealBody(data) {
    data.forEach((v, i) => {
      //console.log(typeof(v.coupon_str),typeof(v.tags_str))
      //判断优惠券的类型是不是string
      if (typeof (v.coupon_str) == "string") {
        v.coupon_str = v.coupon_str.split(",")

        v.showCoupon_str = [...v.coupon_str]
        //console.log(v.coupon_str,v.showCoupon_str)
        //v.coupon_str.length>2?v.showCoupon_str.length=2:
        if (v.coupon_str.length > 2) {
          v.showCoupon_str.length = 2
        }

      } else {
        //console.log(`第${i}个店的优惠券coupon_str为空`)
        v.coupon_str = []
      }

      if (typeof (v.tags_str) == "string" && v.tags_str.length > 0) {
        v.tags_str = v.tags_str.split(",")

        v.showTags_str = [...v.tags_str]
        if (v.tags_str.length > 2) {
          v.showTags_str.length = 2
        }
      } else {
        v.tags_str = []
        //console.log(`第${i}个店的标签tags_str为空`)
      }

      if (v.distance2 == "未知") {
        v.showDistance = ""
      } else {
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
      url: `${app.globalData.url}/index.php?app=nyms_homepage&act=getStoreByMenu`,
      data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res)
        if (res.data.done) {
          let realData = that.renderRealBody(res.data.retval)//要渲染的数据
          let arr = [...that.data.renderdata]
          realData.forEach(v => { arr.push(v) })
          if (arr.length <= 0) {
            let nodata = wx.getStorageSync("langIndex") ? "Temporarily no data" : "暂无搜索数据"
            that.setData({
              nodata,
              imgsrc:"/src/img/nodataSearch.jpg"
            })
          } else {
            that.setData({
              nodata: "",
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
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.setLanguage();
    this.setData({
      "getAllArgu.lat": wx.getStorageSync('lat'),
      'getAllArgu.lng': wx.getStorageSync('lng'),
      'getAllArgu.user_id': wx.getStorageSync('user_id'),
      'getAllArgu.cOre': wx.getStorageSync("langIndex")
    })
    if (options.type){
      let type = options.type
      this.setData({
        "getAllArgu.sort": type
      })
      console.log(options.type, this.data.getAllArgu,140)
      this.getAllStores(this.data.getAllArgu)
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
    if (app.globalData.toClassifyStoreId == app.globalData.clickStoreId) {
      console.log("要加收藏")
      let renderdata = this.data.renderdata
      renderdata.forEach((v, i) => {
        if (v.store_id == app.globalData.toClassifyStoreId) {
          if (v.has_collect != 0) {
            v.has_collect = 0
          } else {
            v.has_collect = 1
          }
        }
      })
      this.setData({
        renderdata,
      })
    }
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
      /* isReachBottom: ++this.data.isReachBottom, */
      startAll: this.data.startAll + 10,
      "getAllArgu.start": this.data.startAll + 10
    })
    console.log(this.data.getAllArgu)
    this.getAllStores(this.data.getAllArgu)

  },

})