const effectsList = require('./effectsList.json')

Component({
  mixins: [],
  data: {
    audioEffectsLib: effectsList,
    audioEffectsSelected: 0,
    audioEffectsOn: false,
    audioEffects: [
      // { audioId: 0, title: '打球哒哒声', startPos: 0, duration: 4000 },
      // { audioId: 1, title: '水花声', startPos: 6000, duration: 2000 },
      // { audioId: 1, title: '水花声', startPos: 9000, duration: 500 }
    ]
  },
  props: {
    duration: 1000
  },
  onInit() {
    my.getSystemInfo({
      success: res => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onMove(res) {
      let move = (res.changedTouches[0].clientX - this.offset) * 750 / this.data.windowWidth
      move = move * this.props.duration / 600
      let id = parseInt(res.target.dataset.id || 0)
      let boundary = this.getAudioEffectBoundary(id)
      if (move + this.pos >= boundary[0] && move + this.pos <= boundary[1]) {
        this.data.audioEffects[id].startPos = move + this.pos
        this.setData({
          audioEffects: this.data.audioEffects
        })
      }
    },
    startMove(res) {
      let id = parseInt(res.target.dataset.id || 0)
      this.pos = this.data.audioEffects[id].startPos
      this.offset = res.changedTouches[0].clientX
    },
    endMove() {
      this.pos = null
      this.offset = null
      this.setData({
        startPosMoving: false,
        endPosMoving: false
      })
    },
    addAudioEffect(res) {
      let info = res.target.dataset.info
      if (this.data.audioEffects.length) {
        let last = this.data.audioEffects.length - 1
        let lastAudio = this.data.audioEffects[last]
        if (this.props.duration - lastAudio.startPos - lastAudio.duration >= info.duration) {
          this.data.audioEffects.push({
            audioId: info.audioId, title: info.title,
            startPos: lastAudio.startPos + lastAudio.duration, duration: info.duration
          })
          this.setData({
            audioEffects: this.data.audioEffects
          })
        } else {
          my.alert({
            title: '温馨提示',
            content: '当前气氛音效剩余时长不足添加该音效',
            buttonText: '我知道了'
          })
        }
      } else {
        if (info.duration < this.props.duration)
          this.setData({
            audioEffects: [{
              audioId: info.audioId, title: info.title,
              startPos: 0, duration: info.duration
            }]
          })
        else {
          my.alert({
            title: '温馨提示',
            content: '当前气氛音效剩余时长不足添加该音效',
            buttonText: '我知道了'
          })
        }
      }
      this.showAudioEffects()
    },
    switchAudioEffectsType(res) {
      this.setData({
        audioEffectsSelected: parseInt(res.target.dataset.id)
      })
    },
    getAudioEffectBoundary(id) {
      if (this.data.audioEffects.length === 1) return [0, this.props.duration - this.data.audioEffects[0].duration]
      else if (id === 0) return [0, this.data.audioEffects[1].startPos - this.data.audioEffects[0].duration]
      else if (id === this.data.audioEffects.length - 1) return [this.data.audioEffects[id - 1].startPos + this.data.audioEffects[id - 1].duration, this.props.duration - this.data.audioEffects[id].duration]
      else return [this.data.audioEffects[id - 1].startPos + this.data.audioEffects[id - 1].duration, this.data.audioEffects[id + 1].startPos - this.data.audioEffects[id].duration]
    },
    showAudioEffects() {
      this.setData({
        audioEffectsOn: !this.data.audioEffectsOn
      })
    }
  }
})
