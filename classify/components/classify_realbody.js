// classify/components/classify_realbody.js
let app = getApp()
import event from '../../utils/event'
let QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Component({
  properties: {
    showNum:{
      type: Number,
      value: 0,
      observer(){
        console.log(this.properties.showNum,11)
      }
    },
    language: {
      type: Object,
      value: wx.T.getLanguage(),
    },
    foodList: {
      type: Array,
      value: [],
      observer() {
        this.triggerEvent("hideLoad")
      }
    },
    renderdata:{
      type:Array,
      value: [],
      observer() {
        let renderdata = this.properties.renderdata
        this.setData({
          foodList: [...renderdata]
        })
       
        console.log(this.data.foodList)
      }
    },
    isCollect:{
      type: Boolean,
      value:false
    },
  },

  data: {
    globelUrl:app.globalData.url,
    startAll:0,
    language: '',
    getAllArgu:{
      is_search: 0,
      lat: wx.getStorageSync('lat'), 
      lng: wx.getStorageSync('lng'),

      tag_id: 0,
      sort: 0,
      city: 0,
      onlyhascoupon: 0,
      onlynew: 0,
      onlyFullReduce: 0,
      scategory: 0,
      search_str: 0,
      user_id: wx.getStorageSync('user_id'),

      start: 0,
      cOre: wx.getStorageSync("langIndex")
    },
    clickStoreId:null,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    doNothing(){

    },
    goStoreDet(e){
      if(e.target.dataset.id =="navigation") return

      let user_id = wx.getStorageSync("user_id")
      let store_id = e.currentTarget.dataset.storeid
      let lat = wx.getStorageSync('lat')
      let lng = wx.getStorageSync('lng')
      let cOre = wx.getStorageSync('langIndex')
      app.globalData.clickStoreId = store_id
      
      wx.navigateTo({
        url: `/find/page/store_real?user_id=${user_id}&cOre=${cOre}&store_id=${store_id}&lat=${lat}&lng=${lng}`,
      })
    },
    navigation(e){
      app.checkGeo()
      let cuslat= e.currentTarget.dataset.cuslat
      let cuslng = e.currentTarget.dataset.cuslng
      let store_id = e.currentTarget.dataset.store_id

      var addr = e.target.dataset.addr;
      var that = this;
      console.log(cuslat, cuslng,e.target.dataset.addr)

      // qqmapsdk = new QQMapWX({
      //   key: 'LADBZ-3RBWG-C4NQR-IHK7I-PZKQQ-MLF7I'
      // });
      // qqmapsdk.geocoder({
      //   address: addr,
      //   success: function (res) {
      //     console.log(res);
      //     var local = res.result.location;
      //     that.setData({
      //       latitude: local.lat,
      //       longitude: local.lng
      //     })
      //   }
      // })
      wx.getLocation({
        type: 'gcj02', 
        success: function (res) {
          console.log(res)
          wx.openLocation({
            latitude: parseFloat(cuslat),
            longitude: parseFloat(cuslng),
            scale: 28,
            name: addr, //打开后显示的地址名称
          })
        },
        fail(err){console.log(err)}
      })
      return

      // wx.navigateTo({
      //   url: `/classify/page/classify_link?cuslat=${cuslat}&cuslng=${cuslng}&store_id=${store_id}`,
      // })
    },
    getAllStores(data){
      let argus = this.data.getAllArgu
      this.triggerEvent("fromChild",argus,true)
    }, 
    cancelThis(e){
      let argus = e.currentTarget.dataset.item_id
      this.triggerEvent("cancelCollect", argus, true)
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    },
  },
  pageLifetimes: {
    show: function () {
      this.setLanguage();
    },
  },
  lifetimes: {
    attached: function () {
      this.setData({
        langIndex: wx.getStorageSync('langIndex')
      });
      //this.getAllStores(this.data.getAllArgu)
    },
  },
})
