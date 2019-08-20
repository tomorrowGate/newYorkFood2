// find/components/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowDia: {
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
    cencleDia(e){
      this.setData({
        isShowDia: true
      })
    },
  }
})
