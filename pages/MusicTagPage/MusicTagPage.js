Page({
  data: {
    tempoId: "1",
    motionId: "1",
    sceneId: "1",

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
  onLoad() {},

  changeTempoId(e) {
    const { value } = e.target.dataset;
    this.setData({
      tempoId: value,
    })
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
  }
});
