// 第一步：创建behavior.js，里面的properties，data，methods里面的方法，可以共享给movie、music等等组件使用
let SmallFourBeh = Behavior({
  // 共享属性
  properties: {
    dataName: Array,
  },
  // 共享数据
  data: {
    needRender: '',
  },
  // 共享方法
  methods: {
    triggerRender(dataName) {
      this.setData({
        needRender: dataName
      })
    }
  }
})
export { SmallFourBeh } // 导出