var app = getApp();
const plugin = requirePlugin('myPlugin');

Page({
  data: {
    venueId: "",

    tempoId: "1",
    motionId: "1",
    sceneId: "1",

    getRes: false,
    mediaResponse: null,
    chosenVideoPath: "",
    bizIdChosen: "",

    tempoTypes: [
      {
        id: 1,
        name: "动感",
      },{
        id: 2,
        name: "自然",
      },{
        id: 3,
        name: "舒缓",
      },
    ],

    motionTypes: [
      {
        id: 1,
        name: "快乐",
      },{
        id: 2,
        name: "悲伤",
      },{
        id: 3,
        name: "酷炫",
      },{
        id: 4,
        name: "冒险",
      },{
        id: 5,
        name: "力量",
      },{
        id: 6,
        name: "有趣",
      },{
        id: 7,
        name: "梦想",
      },{
        id: 8,
        name: "律动",
      },{
        id: 9,
        name: "放松",
      },{
        id: 10,
        name: "浪漫",
      },
    ],

    sceneTypes: [
      {
        id: 1,
        name: "健身",
      },{
        id: 2,
        name: "奔跑",
      },{
        id: 3,
        name: "热身",
      },{
        id: 4,
        name: "散步",
      },{
        id: 5,
        name: "街头",
      },{
        id: 6,
        name: "对决",
      },{
        id: 7,
        name: "球场",
      },{
        id: 8,
        name: "竞技",
      },{
        id: 9,
        name: "水上",
      },
    ],
  },

  onLoad(options) {
    console.log("venueId: ", options.venueId);
    console.log("venueName: ",app.globalData.museums[options.venueId-1].name);
    this.setData({
      venueId: options.venueId,
      bizIdChosen: app.globalData.museums[options.venueId-1].bizId
    })
    console.log("bizId: ", this.data.bizIdChosen);
  },

  async onReady() {
    const response = await plugin.invokeMediaEditor({
      bizId: this.data.bizIdChosen,
      showLoading: true,
      // scrType: 'camera' | 'album',
      params: {
        skipEdit: true,
      },
    });
    console.log("response:");
    console.log(response);
    // console.log(response.data.medias[0].videoPath);

    // 如果用户没有选择视频，则返回原来的页面
    if(response.success == false) {
      console.log("没有视频！");
      my.navigateBack();
    }

    else {
      this.setData({
        getRes: true,
        mediaResponse: response,
        chosenVideoPath: response.data.medias[0].videoPath,
      });
    }
  },

  changeTempoId(e) {
    const { value } = e.target.dataset;
    this.setData({
      tempoId: value,
    });
  },
  changeMotionId(e) {
    const { value } = e.target.dataset;
    this.setData({
      motionId: value,
    })
  },
  changeSceneId(e) {
    const { value } = e.target.dataset;
    this.setData({
      sceneId: value,
    })
  },

  nextStep() {
    console.log("tempoId: ", this.data.tempoId);
    console.log("motionId: ", this.data.motionId);
    console.log("sceneId: ", this.data.sceneId);
    const passRes = JSON.stringify(this.data.mediaResponse);
    my.navigateTo({
      url: '/pages/UploadPage/UploadPage?venueId=' + this.data.venueId + '&passRes=' + passRes
    });
  }
});
