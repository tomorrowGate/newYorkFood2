// find/components/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowDia: {
      type:Boolean,
      value:false
    },
    isAcCenCle:{
      type: Boolean,
      value: true
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
      if (this.properties.isAcCenCle){
        this.setData({
          isShowDia: true
        })
      }
    },
  }
})
