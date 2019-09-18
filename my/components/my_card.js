// my/components/my_card.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    language:{
      type:Object,
      value: wx.T.getLanguage(),
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    language: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage(),
      });
      //console.log(this.properties.language, wx.T.getLanguage())
    },
    goBlack(options){
      let title = wx.getStorageSync("langIndex") ? "You are not a black card user" : "您不是黑卡用户"
      if (wx.getStorageSync("identity")!=2){
        wx.showToast({
          title,
          icon:"none"
        })
      }else{
        wx.navigateTo({
          url: '/my/page/blackcard',
        })
      }
    },
    goCardDet(e){
      console.log(e)
      wx.navigateTo({
        url: `/my/page/mycard?cardType=${e.currentTarget.dataset.argu}`,
      })
    }
  }, 
  pageLifetimes: {
    show: function () {
      this.setLanguage();
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // this.setData({
      //   langIndex: wx.getStorageSync('langIndex'),
      // });
      
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
