// classify/components/classify_head.js
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
    classify:{
      isActive:0,
      e:null
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeItem(e){
      this.setData({
        "classify.isActive": e.currentTarget.dataset.index,
        "classify.e":e
      })
    },
    haveCus(){
      console.log("优惠券")
    },
    haveCus(){
      console.log("满减")
    }
  }
})
