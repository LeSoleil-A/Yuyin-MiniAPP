var app = getApp()

import { MedalModel } from '../../models/medalmodel'
var medalModel = new MedalModel()

Page({
  data: {
    medalDetail: "",
    arrayFirst: [{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },
    ],
    arraySecond: [{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },
    ],
    arrayThird: [{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },{
      imageSrc: "../../components/wall-medal/image/testMedal.png",
      medalName: "运动新手"
    },
    ]
  },
  async onLoad(){
    const id = 3
    const res = await medalModel.getMedalDetail(id)
    console.log(res)
    this.setData({
      medalDetail: res,
    });
  },
  btnTap(){
    console.log("Tap to share!")
  }
});
