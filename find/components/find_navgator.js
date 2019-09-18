// find/components/find_navgator.js
import event from '../../utils/event'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    renderdata:{
      type:Array,
      value:[],
      observer(){
        
      }
    },
    language:{
      type: Object,
      value: wx.T.getLanguage(),
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showArgu:1,
    language: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeShow(e){
      //console.log(e)
      let showArgu = e.currentTarget.dataset.argu
      this.setData({
        showArgu,
      })
      this.triggerEvent("fromChild", showArgu)
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    },

    
  },
  pageLifetimes: {
    show: function () {
      this.setData({
        langIndex: wx.getStorageSync('langIndex')
      });
      this.setLanguage();
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
     
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
