// find/components/find_search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    realSearch:{
      type:Boolean,
      value:false
    }
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
    goRealSearch(){
      wx.navigateTo({
        url: '/classify/page/main_search',
      })
    }
  }
})
