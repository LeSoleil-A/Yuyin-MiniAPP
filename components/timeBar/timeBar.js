/**
 * 组件：timeBar
 * 作者：Ziyi Lu @ 2021/03
 * 参数：duration 单位（ms） 视频的长度
 * 参数：currentPos 单位（ms） 视频播放的进度，用于设置进度条位置
 * 回调函数：onUpdate
 *    说明：每当剪切视频时长后调用
 *    返回值：例 { startPos: 200, endPos: 1800 }
 * 使用样例：
 *    <time-bar duration="{{ duration }}" onUpdate="updateDuration" />
 * 备注：配色方案仍在等候确定，绘制视频预览功能暂停开发
 */

Component({
  mixins: [],
  data: {
    windowHeight: null,
    windowWidth: null,
    startPos: 0,
    endPos: 1000, // default duration set to 1000ms
    flagWidth: 20,
    flagBorder: 10
  },
  props: {
    duration: 1000,
    currentPos: 0,
    cWidth: 600,
    onUpdate: res => res
  },
  didMount() {
    my.getSystemInfo({
      success: res => {
        console.log(res)
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    this.setData({
      endPos: this.props.duration
    })
  },
  methods: {
    onMove(res) {
      let move = (res.changedTouches[0].clientX - this.offset) * 750 / this.data.windowWidth
      move = move * this.props.duration / this.props.cWidth
      let minLength = (this.data.flagWidth * 2 + this.data.flagBorder) * this.props.duration / this.props.cWidth
      switch (res.target.dataset.type) {
        case 'videostart':
          if (move + this.pos >= 0 && move + this.pos <= this.data.endPos - minLength)
            this.setData({
              startPos: this.pos + move
            })
          break
        case 'videoend':
          if (move + this.pos <= this.props.duration && move + this.pos >= this.data.startPos + minLength)
            this.setData({
              endPos: this.pos + move
            })
          break
      }
    },
    startMove(res) {
      switch (res.target.dataset.type) {
        case 'videostart':
          this.pos = this.data.startPos
          break
        case 'videoend':
          this.pos = this.data.endPos
          break
      }
      this.offset = res.changedTouches[0].clientX
    },
    endMove() {
      this.pos = null
      this.offset = null
      this.props.onUpdate({
        startPos: this.data.startPos,
        endPos: this.data.endPos
      })
    }
  }
})
