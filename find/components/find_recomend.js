// find/components/find_recomend.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article_info: {
      type: Array,
      value: [],
      observer: function () {
        console.log(this.properties.article_info, "文章详细信息")
      }
    },
    tuijian_info: {
      type: Object,
      value: {},
      observer: function () {
        console.log(this.properties.tuijian_info, "推荐文章信息")
      }
    },
    appurl: {
      type: String,
      value: app.globalData.url,
    }
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
    goArticle(options){
      console.log(options)
      console.log(!!options.currentTarget.dataset.link2)
      if (options.currentTarget.dataset.link2 != "0" && options.currentTarget.dataset.link2 != "undefined"){
        var link2 = options.currentTarget.dataset.link2
        wx.navigateTo({
          url: '/find/page/gongzhonghao?link2=' + link2,
        })
      }else{
        var article_id = options.currentTarget.dataset.article_id
        wx.navigateTo({
          url: '/find/page/article?article_id=' + article_id,
        })
      }
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    },
  },

  
  pageLifetimes: {
    show: function () {
      this.setLanguage();

    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        langIndex: wx.getStorageSync('langIndex')
      });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
