// find/components/coupon.js
let app= getApp()
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
    isShowDia:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDia(){
      this.setData({
        isShowDia:false
      })
    },
  sureDia() {
      this.setData({
        isShowDia: true
      })
    },
    con(e){
      console.log(e,123)
    }
  },
  pageLifetimes: {
    show: function () {
      
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log(app.page.got('/find/page/store_real'))

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
