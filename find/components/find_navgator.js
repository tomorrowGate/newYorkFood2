// find/components/find_navgator.js
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
    showArgu:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeShow(e){
      console.log(e)
      let showArgu = e.currentTarget.dataset.argu
      this.setData({
        showArgu,
      })
    }
  }
})
