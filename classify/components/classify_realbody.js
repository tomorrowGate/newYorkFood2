// classify/components/classify_realbody.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showNum:{
      type: Number,
      value: 0,
      observer(){
        console.log(this.properties.showNum,11)
      }
    },
    foodList: {
      type: Array,
      value: [1,2,3,4,5,6]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* foodList:[] */
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  pageLifetimes: {
    show: function () {

    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log(this.properties.foodList)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
