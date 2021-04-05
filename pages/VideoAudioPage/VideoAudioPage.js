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
    useMask: false,
    audio: {}
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
      startPos: Number(query.start),
      endPos: Number(query.end)
    })
  },
  updated(res) {
    this.data.audio = res
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
    + `&duration=${ this.data.duration }&venueId=${ this.data.venueId }`
    + `&start=${ this.data.startPos }&end=${ this.data.endPos }` })
  },
  addVideoMask() {
    this.setData({
      useMask: !this.data.useMask
    })
  },
  generateVideo() {
    var videoData = {
      bg_music: this.data.audio.music,
      musics: this.data.audio.effects,
      template_id: this.data.useMask ? this.data.venueId : -1,
      video_start: this.data.startPos,
      video_end: this.data.endPos
    }
    console.log(videoData)
  }
})
