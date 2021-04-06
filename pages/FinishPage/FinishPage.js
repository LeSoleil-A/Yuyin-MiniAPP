import { VideoModel } from '/models/videomodel'
var videoModel = new VideoModel()

Page({
  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
    videoId: '',
    videoSrc: '',
    keyFrameSrc: '',
    loadingProgress: 100,

    canvasId: 'videocanvas',
    canvasWidth: 574,
    canvasHeight: 1096
  },
  onLoad(query) {
    this.ctx = my.createCanvasContext(this.data.canvasId)
    this.setData({
      videoId: parseInt(query.id)
    })
    // 获取屏幕高度信息
    my.getSystemInfo({
      success: res => {
        this.setData({
          statusBarHeight: res.statusBarHeight,
          titleBarHeight: res.titleBarHeight,
        })
      }
    })
    if (this.data.videoId > 0) {
      this.loadVideo()
    }
    this.drawCanvas()
  },
  loadVideo(timeout = 2000, interval = 1000) {
    setTimeout(() => {
      this.itv = setInterval(async () => {
        if (this.data.loadingProgress < 95) {
          this.setData({
            loadingProgress: this.data.loadingProgress + Math.floor(Math.random() * 5)
          })
        }
        const res = await videoModel.getInfo(this.id)
        console.log('a request has been received', res)
        if (res.state) {
          clearInterval(this.itv)
          // 下载文件
          this.downloadVideo(res.url, res.imageUrl)
        }
      }, interval)
    }, timeout)
  },
  drawCanvas() {
    // 绘制背景
    this.ctx.drawImage('/image/video/base.jpg', 0, 0, this.data.canvasWidth, this.data.canvasHeight)
    // 绘制文字部分
    this.ctx.setFillStyle('white')
    this.ctx.setTextAlign('center')
    this.ctx.setFontSize(28)
    this.ctx.fillText('你是第', this.data.canvasWidth / 2, 50)
    this.ctx.setFontSize(56)
    this.ctx.fillText('21873个', this.data.canvasWidth / 2, 110)
    this.ctx.setFontSize(28)
    this.ctx.fillText('点亮', this.data.canvasWidth / 2, 150)
    this.ctx.setFontSize(44)
    this.ctx.fillText('XXXX场馆', this.data.canvasWidth / 2, 360)
    this.ctx.setFontSize(28)
    this.ctx.fillText('的运动之星', this.data.canvasWidth / 2, 400)
    // 绘制场馆图片
    this.ctx.drawImage('/image/video/test-venue.png', this.data.canvasWidth / 2 - 60, 180, 120, 120)
    // 绘制关键帧
    // this.data.keyframeSrc
    this.ctx.drawImage('/image/video/test-keyframe.png', this.data.canvasWidth / 2 - 180, 420, 360, 660)

    this.ctx.draw()
  },
  // 开启分享面板
  sharePage() {
    this.ctx.toTempFilePath({
      x: 0,
      y: 0,
      // 这里需要调整输出的图像部分
      width: this.data.canvasWidth,
      height: this.data.canvasHeight,
      destWidth: 750,
      destHeight: 825,
      success: res => {
        this.bgImgUrl = res.apFilePath
        my.showSharePanel()
      },
      fail: err => {
        my.alert({
          title: '错误',
          content: '导出分享图片失败：' + JSON.stringify(err),
          buttonText: '我知道了'
        })
      }
    })

  },
  // 返回到首页（清空页面栈）
  goBack() {
    my.navigateBack({
      delta: getCurrentPages().length - 1
    })
  },
  // 将视频保存到本地
  downloadVideo(videoSrc, imageSrc) {
    // 下载视频文件
    my.downloadFile({
      url: videoSrc,
      header: {
        'Content-Type': 'video/video'
      },
      success({ apFilePath }) {
        console.log('downloadVideo success', apFilePath)
        this.setData({
          videoSrc: apFilePath
        })
        // 下载关键帧图片
        my.downloadFile({
          url: imageSrc,
          success({ apFilePath }) {
            console.log('downloadKeyframe success', apFilePath)
            this.setData({
              keyFrameSrc: apFilePath,
              loadingProgress: 100
            })
            this.drawCanvas()
          },
          fail(err) {
            console.warn('downloadKeyframe fail', err)
          },
        })
      },
      fail(err) {
        console.warn('downloadFile fail', err)
      }
    })
  },
  saveVideo() {
    my.saveFile({
      apFilePath: this.data.videoSrc,
      success: () => {
        my.showToast({
          type: 'success',
          content: '保存成功',
          duration: 1000
        })
      },
    })
  },
  // 分享页面的参数
  onShareAppMessage() {
    return {
      title: '标题',
      desc: '描述',
      path: '/pages/index/index',
      bgImgUrl: this.bgImgUrl,
      content: '吱口令文案',
      imageUrl: '图标',
      searchTip: '搜索建议'
    }
  }
})
