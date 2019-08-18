// classify/components/classify_hidebody.js
const app =getApp()
Component({
  /**
   * 组件的属性列表
   */
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
        console.log(this.properties.activenum, this.data.whitchShow)
        if (this.data.activenum != 0) {
          //document.getElementsByTagName("body")[0].style.overflow = "hidden"
        } else {
          //document.getElementsByTagName("body")[0].style.overflow = "scroll"
        }
      }
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
    switchArgu:[],//选中的复选框开关
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideDown(e){
      //console.log(e)
      if(e){
        if (e.target.id == "classfy-down") {
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
    switchOn(e){
      let i = e.currentTarget.dataset.argu
      this.data.switchArgu[i] = !this.data.switchArgu[i]
      this.setData({
        switchArgu: this.data.switchArgu
      })
      console.log(this.data.switchArgu)
    },
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
    getHomepageInfo(){
      let that = this
      wx.request({
        url: `${app.globalData.url}index.php?app=nyms_homepage&act=getHomepageInfo`,
        data: {},
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        success(res){
          //console.log(res)
          if(res.data.done){
            let { tag_info,scategory} = res.data.retval
            that.setData({
              tag_info,
              selectTags: tag_info//用来点击标签用的
            })
            //console.log(that.data.selectTags)
          }
          
        },
        fail(err){
          console.log(err)
        },
        complete(data){
          //console.log(data)
        }
      })
    },
    screenFood(){
      this.hideDown()
    },
    screenSort(){
      this.hideDown()
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
    },
    submit(){
      let subTags = this.data.selectTags.filter((v,i)=>{
        return v.isCheck
      })
      this.hideDown()
      //console.log(subTags)
    }
  },
  pageLifetimes: {
    show: function () {
      this.getHomepageInfo()
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.data.whitchShow = this.properties.activenum

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
