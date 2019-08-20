// find/components/find_recomend.js
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
    goArticle(){
      wx.navigateTo({
        url: '/find/page/article',
      })
    }
  }
})
