import { VideoModel } from '/models/videomodel'
var videoModel = new VideoModel()

Page({
  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
    venueId: '',
    currentPos: 0,
    videoOffset: 0,
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
      videoDuration: Number(query.end) - Number(query.start),
      videoOffset: Number(query.start)
    })
  },
  updated(res) {
    this.data.audio = res
  },
  onVideoTimeUpdate(res) {
    this.setData({
      currentPos: res.detail.currentTime * 1000
    })
    if ((res.detail.currentTime + 0.5) * 1000 <= this.data.startPos) {
      this.videoCtx.seek(this.data.startPos / 1000)
    }
    if (res.detail.currentTime * 1000 >= this.data.endPos) {
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
    my.navigateTo({
      url: `/pages/VideoAudioPage/VideoAudioPage?src=${this.data.videoSrc}`
        + `&duration=${this.data.duration}&venueId=${this.data.venueId}`
        + `&start=${this.data.startPos}&end=${this.data.endPos}`
    })
  },
  addVideoMask() {
    this.setData({
      useMask: !this.data.useMask
    })
  },
  async generateVideo() {
    var that = this
    var musics = this.data.audio.effects
    var newMusics = []
    musics.forEach(each => {
      newMusics.push({
        music_id: each.audioId,
        music_offset: each.startPos + this.data.videoOffset,
        music_duration: each.duration
      })
    })
    var videoData = {
      bgmusic_id: this.data.audio.music.id,
      musics: JSON.stringify({ musics: newMusics }).replace(/"/g, '/').replace(/'/g, '/').replace(/,/g, '*'),
      template_id: this.data.useMask ? this.data.venueId : -1,
      video_start: Math.floor(this.data.videoOffset),
      video_end: Math.floor(this.data.videoOffset + this.data.videoDuration)
    }

    my.uploadFile({
      url: 'https://yuyin.zeguantech.com/yuyinnode/v1/video/upload',
      fileType: 'video',
      fileName: 'file',
      filePath: that.data.videoSrc,
      formData: videoData,
      success: async res => {
        console.log('uploadVideo Success', JSON.parse(res.data))
        // this.id = JSON.parse(res.data).id
        my.navigateTo({ url: `/pages/FinishPage/FinishPage?id=${JSON.parse(res.data).id}` })
      },
      fail: err => {
        console.warn('uploadFile Error', err)
        my.alert({
          title: '错误',
          content: JSON.stringify(err),
          buttonText: '我知道了'
        })
      }
    })
  },
  chooseVideo() {
    var that = this
    my.chooseVideo({
      sourceType: ['album'],
      // compressed: 100,
      success(res) {
        that.setData({
          videoSrc: res.tempFilePath,
        })
      }
    })
  },
})