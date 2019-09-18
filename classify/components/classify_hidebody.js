// classify/components/classify_hidebody.js
let app =getApp()
import event from '../../utils/event'
Component({
  properties: {
    activenum:{
      type:Number,
      value:0
    },
    e:{
      type:Object,
      value:null,
      observer:function(){
        this.setData({
          "whitchShow": this.properties.activenum
        })
      }
    },
    tag_info:{
      type:Array,
      value:[]
    },
    allCount:{
      type: Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    whitchShow: 0,
    switchOpen: [false, false, false],
    selectTags: [],
    tagIndex:null,//选中的tag下标
    tag_info:null,//标签数据
    scategory:null,//菜系
    switchArgu:new Array(3),//选中的复选框开关
    allcity:0,//全城的点击参数
    cityWitch: 0,//全城的点击参数

    rigionArr: [],
    rigionDetArr: [],
    r_id: "",
    changeCity:"",

    language:"",

    citys: [["纽约", "圣弗朗西斯科", "戈丹"], ["杭州", "东京"], ["纽约", "曼哈顿"], ["海湾"], ["纽约第一飞机场"]],//全城的城市参数
    showCityList: ["纽约", "圣弗朗西斯科", "戈丹"],

    getAllArgu: {
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
    getAllArguCopy: {
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
  }, 

  /**
   * 组件的方法列表
   */
  methods: {
    doNothing(){

    },
    getAllRegionType() {
      let that = this
      wx.request({
        url: `${app.globalData.url}index.php?app=nyms_homepage&act=getAllRegionType`,
        data: {
          cOre: wx.getStorageSync("langIndex")
        },
        header: { 'content-type': 'application/x-www-form-urlencoded', },
        method: 'POST',
        dataType: 'json',
        success(res) {
          //console.log(res)
          if (res.data.done) {
            that.setData({
              rigionArr: res.data.retval
            })
          }

        },
        fail(err) {
          console.log(err)
        },
        complete(data) {
          //console.log(data)
        }
      })
      
    },
    hideDown(e){
      //console.log(e)
      if(e){
        if (e.target.id == "mask-temp") {
          this.setData({
            whitchShow: 0
          })
        }
      }else{//不是点击的情况下
        this.setData({
          whitchShow: 0
        })
      }
    },

    //切换全城的列表
    changFilCity(e){
      let i = e.currentTarget.dataset.argu
      if (e.currentTarget.dataset.r_id==999){
        
        this.triggerEvent("fromChild", { is_search: 0 ,city: 0 }, true)
        let allcity = wx.getStorageSync("langIndex")==0?"全城":"all city"
        this.triggerEvent("changeCityShows", allcity, true)
        this.hideDown()
      }
      this.setData({
        cityWitch:i,
        showCityList:this.data.citys[i],

        r_id: e.currentTarget.dataset.r_id,
        changeCity: e.currentTarget.dataset.r_id,
      })

      this.getRegionInfoByRegionType(e.target.dataset.r_id)
    },
    getRegionInfoByRegionType(r_id) {
      console.log(r_id)
      let that = this
      wx.request({
        url: `${app.globalData.url}index.php?app=nyms_homepage&act=getRegionInfoByRegionType`,
        data: {
          r_id: r_id,
          cOre: wx.getStorageSync("langIndex")
        },
        header: { 'content-type': 'application/x-www-form-urlencoded', },
        method: 'POST',
        dataType: 'json',
        success(res) {
          //console.log(res)
          if (res.data.done) {
            that.setData({
              rigionDetArr: res.data.retval
            })
          }
        },
        fail(err) {
          console.log(err)
        },
        complete(data) {
          //console.log(data)
        }
      })

    },

    //筛选全城的筛选
    requeCity(e){
      let argus = { ...this.data.getAllArguCopy }
      console.log(argus, 176)
      this.triggerEvent("fromChild", { is_search: 1, city: e.currentTarget.dataset.rdetid}, true)
      this.triggerEvent("changeCityShows", e.currentTarget.dataset.type_name, true)
      this.hideDown()
    },

    //切换筛选
    switchOn(e){
      let i = e.currentTarget.dataset.argu
      this.data.switchArgu[i] = !this.data.switchArgu[i]
      this.setData({
        switchArgu: this.data.switchArgu
      })
      console.log(this.data.switchArgu)

      if (this.data.switchArgu.indexOf(true) > -1) {
        this.triggerEvent("chageFilter", true, true)
      } else {
        this.triggerEvent("chageFilter", false, true)
      }   

    },

    //选中标签，目前该功能已取消
    chooseTag(e){
      let i = e.currentTarget.dataset.index
      console.log(this.data.selectTags[i],57)
      this.data.selectTags[i].isCheck = !this.data.selectTags[i].isCheck
      console.log(this.data.selectTags[i])
      this.setData({
        tagIndex: i,
        selectTags: this.data.selectTags
      })
    },

    //筛选全部美食的时候
    screenAllFood(e){
      /* let scateid = e.currentTarget.dataset.scateid
      this.setData({
        "getAllArgu.scategory": scateid
      }) */
      let argus = { ...this.data.getAllArguCopy}
      console.log(argus, 176)
      this.triggerEvent("fromChild", { is_search:0}, true)
      this.hideDown()
      let tagName = e.currentTarget.dataset.tagname
      this.triggerEvent("changeTag", tagName, true)

    },
    //筛选美食的标签的时候
    screenFood(e){
      let tagid = e.currentTarget.dataset.tagid
      let argus1 = { ...this.data.getAllArgu }
      this.setData({
        "getAllArgu.is_search": 1,
        "getAllArgu.tag_id": tagid
      })
      let argus = { ...this.data.getAllArgu }
      this.triggerEvent("fromChild", { tag_id: tagid}, true)
      /* this.setData({
        getAllArgu: argus1
      }) */
      this.hideDown()

      let tagName = e.currentTarget.dataset.tagname
      this.triggerEvent("changeTag", tagName, true)

    },

    //点击排序类型进行筛选
    screenSort(e){
      let sorttype = e.currentTarget.dataset.sorttype
      let argus1 = { ...this.data.getAllArgu }
      this.setData({
        "getAllArgu.is_search": 1,
        "getAllArgu.sort": sorttype
      })
      let argus = { ...this.data.getAllArgu }
      console.log(argus, 176)
      this.triggerEvent("fromChild", { sort: sorttype}, true)
      /* this.setData({
        getAllArgu: argus1
      }) */
      this.hideDown()
      
      this.triggerEvent("changeSort", sorttype, true)
    },
    reset(){
      let resTags = this.data.selectTags.map((v, i) => {
        v.isCheck = false
        return v
      })
      let resSwit = this.data.switchArgu.map((v,i)=>{
        v=false
        return v
      })
      this.setData({
        selectTags: resTags,
        switchArgu:resSwit
      })
      
      this.triggerEvent("chageFilter", false, true)
      
    },
    //点击筛选进行提交
    submit(){
      //console.log(this.data.switchArgu,136)
      console.log(this.data.getAllArguCopy, 189)
      let switchArgu = [...this.data.switchArgu]
      //this.triggerEvent("showLoad")
      switchArgu = switchArgu.map((v, i) => {
        v = v ? 1 : 0
        return v
      })
      let subTags = this.data.selectTags.filter((v,i)=>{
        return v.isCheck
      })
      let argus1 = { ...this.data.getAllArgu }
      this.setData({
        "getAllArgu.is_search": 1,
        "getAllArgu.onlyhascoupon": switchArgu[0],
        "getAllArgu.onlynew": switchArgu[1],
        "getAllArgu.onlyFullReduce": switchArgu[2],
      })
      let argus = { ...this.data.getAllArgu }
      let argus2 = {
        onlyhascoupon: switchArgu[0],
        onlynew: switchArgu[1],
        onlyFullReduce: switchArgu[2]
      }
      console.log(argus, 176)
      this.triggerEvent("fromChild", argus2, true)
     /*  this.setData({
        getAllArgu: argus1
      }) */
      this.hideDown()
      return
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    }
  },
  pageLifetimes: {
    show: function () {
      //this.getHomepageInfo()
      this.setLanguage();	// (1)
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.data.whitchShow = this.properties.activenum
      this.setData({
        'getAllArgu.lat': wx.getStorageSync('lat'),
        'getAllArgu.lng': wx.getStorageSync('lng'),
        'getAllArgu.cOre': wx.getStorageSync('langIndex'),
        'getAllArgu.user_id': wx.getStorageSync('user_id'),

        //getAllArguCopy
        'getAllArguCopy.lat': wx.getStorageSync('lat'),
        'getAllArguCopy.lng': wx.getStorageSync('lng'),
        'getAllArguCopy.cOre': wx.getStorageSync('langIndex'),
        'getAllArguCopy.user_id': wx.getStorageSync('user_id'),
      })
      this.getAllRegionType()
      //this.setLanguage();	// (1)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
