// my/components/my_card.js
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
    goBlack(){
      wx.navigateTo({
        url: '/my/page/blackcard',
      })
    },
    goCardDet(e){
      console.log(e)
      wx.navigateTo({
        url: `/my/page/mycard?cardType=${e.currentTarget.dataset.argu}`,
      })
    }
  }
})
