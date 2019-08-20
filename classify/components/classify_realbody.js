// classify/components/classify_realbody.js
Component({
  relations: {
    './classify_hidebody': { //注意！必须双方组件都声明relations属性
      type: 'parent'
    }
  },
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
    },
    isCollect:{
      type: Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    a:1
    /* foodList:[] */
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goStoreDet(e){
      if(e.target.dataset.id =="navigation") return
      wx.navigateTo({
        url: '/find/page/store_real',
      })
    },
    navigation(e){
      console.log(e)
    }
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
