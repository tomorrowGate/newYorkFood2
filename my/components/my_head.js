// my/components/my_head.js
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
    goMessage(){
      wx.navigateTo({
        url: '/my/page/message/Message',
      })
    },
    goMyInfo(){
      wx.navigateTo({
        url: '/my/page/information/personal',
      })
    }
  }
})
