Page({
  data: {
    chosenMusicId: "",
    play: false,
    borderStyle: "",

    videoLoop: true,
    response: null,
    venueId: "",
    chosenVideoPath: ""
  },

  onLoad(options) {
    const getRes = JSON.parse(options.passRes);
    this.setData({
      response: getRes,
      venueId: options.venueId,
      chosenVideoPath: getRes.data.medias[0].videoPath
    });

    this.videoContext = my.createVideoContext('myVideo');

    this.innerAudioContext = my.createInnerAudioContext();
    this.innerAudioContext.src = 'A*lv2JQabMI4oAAAAAAAAAAAAAARInAQ';
    this.innerAudioContext.autoplay = false;
    this.innerAudioContext.loop = false;
    this.innerAudioContext.obeyMuteSwitch = false;
  },

  musicEvent() {
    // 如果未播放音乐，则播放音乐，过程中视频循环，每当视频循环音乐都会重新开始
    if(this.data.play==false){
      this.innerAudioContext.play();
      this.videoContext.seek(0);
      this.videoContext.play();
      this.setData({
        play: true,
        borderStyle: "solid",
      })
    }
    else{
      this.innerAudioContext.stop();
      this.videoContext.seek(0);
      this.videoContext.play();
      this.setData({
        play: false,
        borderStyle: "none",
      })
    }
  },

  // 每当视频循环音乐都会重新开始
  onEnded() {
    if(this.data.play==true){
      this.innerAudioContext.seek(0);
      this.innerAudioContext.play();
    }
  },

  toMusicChose() {
    this.innerAudioContext.stop();
    const passRes = JSON.stringify(this.data.response);
    my.navigateTo({
      url: '/pages/UploadPage/UploadPage?venueId=' + this.data.venueId + '&passRes=' + passRes
    });
  }
});
