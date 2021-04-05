Page({
  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
    venueId: '',
    currentPos: 0,
    startPos: 0,
    endPos: 0,
    videoSrc: '',
    videoDuration: null,
  },
  onLoad(query) {
    // 获取camera和video组件
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
    this.setData({
      venueId: Number(query.venueId),
      videoSrc: query.src,
      videoDuration: Number(query.duration),
      endPos: Number(query.duration)
    })
  },
  updated(res) {
    this.setData({
      startPos: res.startPos,
      endPos: res.endPos
    })
    this.videoCtx.seek(res.startPos / 1000)
  },
  onVideoTimeUpdate(res) {
    this.setData({
      currentPos: res.detail.currentTime * 1000
    })
    if((res.detail.currentTime + 0.5) * 1000 <= this.data.startPos) {
      this.videoCtx.seek(this.data.startPos / 1000)
    }
    if(res.detail.currentTime * 1000 >= this.data.endPos) {
      this.videoCtx.stop()
      this.setData({
        currentPos: 0
      })
    }
  },
  prevStep() {
    my.navigateBack()
  },
  nextStep() {
    my.navigateTo({ url: `/pages/VideoAudioPage/VideoAudioPage?src=${ this.data.videoSrc }`
    + `&duration=${ this.data.videoDuration }&venueId=${ this.data.venueId }`
    + `&start=${ this.data.startPos }&end=${ this.data.endPos }` })
  }
})
