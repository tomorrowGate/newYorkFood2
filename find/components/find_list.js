// find/components/find_list.js
let app = getApp()
import event from '../../utils/event'
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
    language: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gofilterStore(e){
      let type = e.currentTarget.dataset.storetype
      wx.navigateTo({
        url: `/classify/page/classify_searchbody?type=${type}`,
      })
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    }
  },
  pageLifetimes: {
    show: function () {
      this.setLanguage();	
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      event.on("languageChanged", this, this.setLanguage); // (2)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
