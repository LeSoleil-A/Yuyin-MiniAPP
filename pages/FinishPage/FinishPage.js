Page({
  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
    venueId: ''
  },
  onLoad(query) {
    // 获取camera和video组件
    this.cameraCtx = my.createCameraContext('camera')
    this.videoCtx = my.createVideoContext('video')
    // 获取屏幕高度信息
    my.getSystemInfo({
      success: res => {
        this.setData({
          statusBarHeight: res.statusBarHeight,
          titleBarHeight: res.titleBarHeight,
        })
      }
    })
    console.log('venueId: ', query.venueId)
    this.setData({
      venueId: query.venueId
    })
  },
  gotoCamera() {
    my.navigateTo({
      url: `/pages/CameraPage/CameraPage?venueId=${ this.data.venueId }`
    })
  }
})
