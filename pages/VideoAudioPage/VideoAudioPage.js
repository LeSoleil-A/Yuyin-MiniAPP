import { VideoModel } from '/models/videomodel'
var videoModel = new VideoModel()
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
  async generateVideo() {
    var that = this
    var musics = this.data.audio.effects
    var newMusics = []
    musics.forEach(each=>{
      newMusics.push({
        music_id:each.audioId,
        music_offset:each.startPos,
        music_duration:each.duration
      })
    })
    var videoData = {
      bgmusic_id: this.data.audio.music.id,
      musics: JSON.stringify({ musics: newMusics }).replace(/"/g, '/').replace(/'/g, '/').replace(/,/g, '*'),
      template_id: this.data.useMask ? this.data.venueId : -1,
      video_start: this.data.startPos,
      video_end: this.data.endPos
    }
    console.log(videoData)
    
    my.uploadFile({
      url: 'https://yuyin.zeguantech.com/yuyinnode/v1/video/upload',
      fileType: 'video',
      fileName: 'file',
      filePath: that.data.videoSrc,
      formData: videoData,
      success: async res => {
        console.log('uploadVideo Success', JSON.parse(res.data))
        this.id = JSON.parse(res.data).id
        // 这里发请求
        my.showLoading()
        setTimeout(() => {
          console.log('makeRequest timeout')
          this.itv = setInterval(async () => {
            const res = await videoModel.getInfo(this.id)
            console.log('a request has been received', res)
            if (res.state) {
              clearInterval(this.itv)
              my.hideLoading()
              // 此处执行接下去的逻辑，展示视频等
              my.setStorageSync({
                key: 'videoSrc',
                data: {
                  videoSrc: res.url
                }
              })
              my.navigateTo({ url: '/pages/result/result' })
            }
          }, 1000)
        }, 2000)
    },fail:err=>{
      console.log("err",err)
    }
  })
}
})