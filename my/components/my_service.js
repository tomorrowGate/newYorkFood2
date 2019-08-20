// my/components/my_service.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goCustomer(){
      /* wx.navigateTo({
        url: '/my/page/',
      }) */
    },
    goCollect(){
      wx.navigateTo({
        url: '/my/page/collect',
      })
    },
    goFeedback(){
      wx.navigateTo({
        url: '/my/page/feedback/feedback',
      })
    },
    goCooperation(){
      wx.navigateTo({
        url: '/my/page/cooperation/cooperation',
      })
    },
    goSetUp(){
      wx.navigateTo({
        url: '/my/page/setup/setUp',
      })
    }
  }
})
