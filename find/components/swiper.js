// find/components/swiper.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiper: {
      type: Object,
      value: {
        imgUrls: [],
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperStatic: {
      indicatorDots: true,
      indicatorColor: "#dedede",
      indicatorActiveColor: "#1f9cfd",
      autoplay: true,
      interval: 4000,
      duration: 1000,
      circular: true,
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_lunbo: function () {
      //获取轮播图
      var that = this;
      
    },
  },
  pageLifetimes: {
    show: function () {
      
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

