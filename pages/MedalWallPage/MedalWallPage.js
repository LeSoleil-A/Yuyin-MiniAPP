var app = getApp()
import { UserModel } from '/models/usermodel'
var userModel = new UserModel()
import { VenueModel } from '../../models/venuemodel'
var venueModel = new VenueModel()
import { MedalModel } from '../../models/medalmodel'
var medalModel = new MedalModel()

Page({
  data: {
    canIUse: false, //用户之前有没有授权过
    nickName: "",
    userImageSrc: "",
    medalDetail: null,
    showModal: false,
    medalNameTap: "",
    medalImgSrcTap: null,
    medalConditionTap: "",
    venueListTap: [],
    arrayFirst: [{
      medalId: "8",
      medalName: "运动新手",
      medalCondition: "连续打卡1天",
      venueList: []
    },{
      medalId: "14",
      medalName: "西子湖畔",
      medalCondition: "点亮所有西湖区运动场馆",
      venueList: [1, 2, 3, 4]
    },{
      medalId: "17",
      medalName: "良渚古城",
      medalCondition: "点亮所有余杭区运动场馆",
      venueList: [11, 12]
    },{
      medalId: "13",
      medalName: "体育满绩",
      medalCondition: "点亮所有大学运动场馆",
      venueList: [1, 7, 2]
    },{
      medalId: "22",
      medalName: "激流勇将",
      medalCondition: "点亮所有水上运动场馆",
      venueList: [4, 9, 6]
    },
    ],
    arraySecond: [{
      medalId: "3",
      medalName: "大放异彩",
      medalCondition: "在我的亚运之旅中累计点亮12个场馆",
      venueList: []
    },{
      medalId: "15",
      medalName: "皋亭山顶",
      medalCondition: "点亮所有江干区运动场馆",
      venueList: [6, 7]
    },{
      medalId: "18",
      medalName: "钱江潮涌",
      medalCondition: "点亮所有萧山区运动场馆",
      venueList: [13, 14, 15]
    },{
      medalId: "20",
      medalName: "杭州印象",
      medalCondition: "点亮所有杭州运动场馆",
      venueList: []
    },{
      medalId: "23",
      medalName: "制霸赛场",
      medalCondition: "点亮所有竞技性运动场馆",
      venueList: [3, 8, 13, 14, 17]
    },
    ],
    arrayThird: [{
      medalId: "6",
      medalName: "坚持不懈",
      medalCondition: "重复打卡任意场馆5次",
      venueList: []
    },{
      medalId: "16",
      medalName: "白马湖心",
      medalCondition: "点亮所有滨江区运动场馆",
      venueList: [8, 9]
    },{
      medalId: "19",
      medalName: "富春桃源",
      medalCondition: "点亮所有富阳区运动场馆",
      venueList: [16, 17]
    },{
      medalId: "21",
      medalName: "球球作战",
      medalCondition: "点亮所有球类运动场馆",
      venueList: [1, 2, 6, 10, 12]
    },{
      medalId: "24",
      medalName: "不服solo",
      medalCondition: "点亮所有对抗性运动场馆",
      venueList: [5, 7, 11, 15, 18]
    },
    ]
  },
  async onLoad(){
    my.getOpenUserInfo({
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
          if (userInfo.code != "10000") {
            this.setData({
              canIUse: false
            })
          } else {
            this.setData({
              nickName: userInfo.nickName,
              userImageSrc: userInfo.avatar,
              canIUse: true
            })
          }
        },
    });
    
    const listMedal = await userModel.getLitMedal()
    // console.log(listMedal)
  },
  onTapMedal(res){
    let temp = []
    res.venueIdListTap.forEach((item) => {
      temp.push(venueModel.getVenueDetail(item))
    });
    Promise.all(temp).then((e)=>{
      this.setData({
        venueListTap: e
      });
      // console.log('get: ' , this.data.venueListTap)
    })

    this.setData({
      showModal: res.showModal,
      medalNameTap: res.medalNameTap,
      medalImgSrcTap: res.medalImgSrcTap,
      medalConditionTap: res.medalConditionTap
    })
  },
  onModalClose(){
    this.setData({
      showModal: false,
      medalNameTap: "",
      medalImgSrcTap: null,
      medalConditionTap: "",
      venueListTap: [],
    })
  },
  btnTap(){
    console.log(this.data.nickName)
  },
});
