// find/components/find_video.js
let app =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    video_info: {
      type: Array,
      value: [],
      observer: function () {
        console.log(this.properties.video_info,"视频的详细信息");
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
    fullScreen:null,
    language: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fullScreen(e){
      var isFull = e.detail.fullScreen;
      //视屏全屏时显示加载video，非全屏时，不显示加载video
      this.setData({
        fullScreen: isFull
      })
    },
    setLanguage() {
      this.setData({
        language: wx.T.getLanguage()
      });
    },
    videoPlay(e){
      let id = e.currentTarget.id;
      let that = this
      let videoContext = wx.createVideoContext(id, this);

      if (this.data.prevId && this.data.prevId != id) {
        let prevId = this.data.prevId
        wx.createVideoContext(prevId, this).pause()
        console.log(prevId,id)
      }
      videoContext.requestFullScreen();
      this.setData({
        fullScreen: true,
        prevId:id
      })
    },
    closeVideo(e) {
      //执行退出全屏方法
      let id = e.currentTarget.id;
      var videoContext = wx.createVideoContext(id, this);
      videoContext.exitFullScreen();
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
      //console.log(app.page.get('/find/components/coupon').data.isShowDia, 31313131)

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
