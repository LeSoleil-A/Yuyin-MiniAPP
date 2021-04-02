Page({
  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
    venueId: '',
    camera: true, // 前后摄像头
    onAir: false, // 是否正在录制
    videoSrc: '', // video地址
    hasVideo: false, // 是否已经存在video
    duration: 0, // 录制时长
    maxDuration: 20000, // 最长录制时长，20s
    timer: '00:0', // 显示时长
    countdownCtrl: [-45, 135, 135, 1]
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
  // 切换前后摄像头
  switchCamera() {
    this.setData({
      camera: !this.data.camera
    })
  },
  // 处理camera组件的报错
  cameraError(err) {
    // when user declined authorization to camera
    console.warn('camera error', err)
  },
  // 开始录像
  startRecording() {
    // 在开始录像前，先停止视频的播放
    this.videoCtx.stop()
    this.setData({
      onAir: true,
      hasVideo: false,
      camera: this.data.camera
    })
    // using interval to display recording duration and stop recording when exceeding time limit
    var startTime = Date.now()
    this.itv = setInterval(() => {
      let duration = Math.round(Date.now() - startTime)
      this.updateCountdown(duration / this.data.maxDuration)
      this.setData({
        duration,
        timer: this.toTimerStr(duration)
      })
      // stop recording when reaching max duration limit
      if(duration >= this.data.maxDuration)
        this.stopRecording()
    }, 100)
    // start recording using camera context
    this.cameraCtx.startRecord({
      success: res => {
        console.log('startRecording success', res)
        this.listener.start()
      },
      fail: err => {
        console.log('startRecording fail', err)
      }
    })
  },
  // 停止录像
  stopRecording() {
    clearInterval(this.itv)
    this.setData({
      onAir: false
    })
    this.cameraCtx.stopRecord({
			success: res => {
        console.log('stopRecording success', res)
        this.setData({
          videoSrc: res.tempVideoPath,
          hasVideo: true
        })
        this.videoCtx.play()
        this.listener.stop()
      },
      fail: err => {
        console.log('stopRecording fail', err)
      }
    })
  },
  // 删除已录制的视频
  deleteVideo() {
    my.confirm({
      title: '温馨提示',
      content: '您是否确认要删除已录制的视频？',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: res => {
        if(res.confirm) {
          this.setData({
            hasVideo: false,
            videoSrc: '',
            timer: '00:0'
          })
          this.videoCtx.stop()
        }
      }
    })
  },
  // 将ms时长格式转换为点分时间格式
  toTimerStr(duration) {
    let ms = Math.floor(duration % 1000 / 100)
    let s = Math.floor(duration / 1000)
    s = s < 10 ? '0' + s : String(s)
    return s + ':' + ms
  },
  updateCountdown(perc) {
    if(perc < 0.5) {
      this.setData({
        countdownCtrl: [
          -45, 135,
          135 - 360 * perc,
          1
        ]
      })
    } else {
      this.setData({
        countdownCtrl: [
          -45,
          135 - 360 * (perc - 0.5),
          135, 0
        ]
      })
    }
  }
})
