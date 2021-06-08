var app = getApp()
import { UserModel } from '/models/usermodel'
var userModel = new UserModel()
import { VenueModel } from '../../models/venuemodel'
var venueModel = new VenueModel()
import { MedalModel } from '../../models/medalmodel'
var medalModel = new MedalModel()

Page({
  data: {
    // 横向选项卡部分
    tabs: [
      {
        title: '我的视频',
      },
      {
        title: '我的勋章',
      }
    ],
    activeTab: 0,

    // 视频部分
    videoType: '全部运动',
    videoTypeIndex: 0,
    videoTypeArray: [
      {
        id: 0,
        name: '全部运动',
      },{
        id: 1,
        name: '对抗运动',
      },{
        id: 2,
        name: '球类运动',
      },{
        id: 3,
        name: '竞技运动',
      },{
        id: 4,
        name: '水上运动',
      }
    ],

    // 勋章部分
    arrayFirst: [],
    arraySecond: [],
    arrayThird: [],
    listTwo:[14, 15, 16, 17, 13, 18],
    listThird:[19, 21, 22, 20],

    // 处理勋章点击事件
    showMask: false,
    medalNameTap: "",
    medalImgSrcTap: null,
    medalConditionTap: "",
    medalIsLitTap: false,
    medalLitVenueTap: [],
    venueLitTap: [],
    venueNotLitTap: [],

    arrayTestOne: [
      {
        medalId: 8,
        medalIsLit: true,
        medalLitVenue: []
      },{
        medalId: 1,
        medalIsLit: true,
        medalLitVenue: []
      },{
        medalId: 5,
        medalIsLit: true,
        medalLitVenue: []
      },
    ],
    arrayTestTwo: [
      {
        medalId: 13,
        medalIsLit: true,
        medalLitVenue: [1]
      },{
        medalId: 13,
        medalIsLit: true,
        medalLitVenue: [1]
      },{
        medalId: 13,
        medalIsLit: true,
        medalLitVenue: [1]
      },{
        medalId: 13,
        medalIsLit: true,
        medalLitVenue: [1]
      },{
        medalId: 13,
        medalIsLit: true,
        medalLitVenue: [1]
      },{
        medalId: 13,
        medalIsLit: true,
        medalLitVenue: [1]
      }
    ],
    arrayTestThird: [
      {
        medalId: 19,
        medalIsLit: true,
        medalLitVenue: [1]
      },{
        medalId: 19,
        medalIsLit: true,
        medalLitVenue: [1]
      },{
        medalId: 19,
        medalIsLit: true,
        medalLitVenue: [1]
      },{
        medalId: 19,
        medalIsLit: true,
        medalLitVenue: [1]
      }
    ],
  },

  onLoad() {},

  async onShow(){
    // 获取用户信息，之后要改为直接从前面获取
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
    
    // 获取勋章的点亮信息
    const listMedal = await userModel.getLitMedal()

    // 获取各个列表
    let tempFirst = []
    let tempSecond = []
    let tempThird = []
    // 判断运动天数勋章：找到最大的已点亮序号
    var itemFirst = null
    if(listMedal[11].isLit==true){
      itemFirst = {
        medalId: 12,
        medalIsLit: true
      }
    } else if(listMedal[10].isLit==true){
      itemFirst = {
        medalId: 11,
        medalIsLit: true
      }
    } else if(listMedal[9].isLit==true){
      itemFirst = {
        medalId: 10,
        medalIsLit: true
      }
    } else if(listMedal[8].isLit==true){
      itemFirst = {
        medalId: 9,
        medalIsLit: true
      }
    } else if(listMedal[7].isLit==true){
      itemFirst = {
        medalId: 8,
        medalIsLit: true
      }
    } else {
      itemFirst = {
        medalId: 8,
        medalIsLit: false
      }
    }
    tempFirst.push(itemFirst);

    // 判断场馆数勋章：找到最大的已点亮序号
    var itemSecond = null
    if(listMedal[3].isLit==true){
      itemSecond = {
        medalId: 4,
        medalIsLit: true
      }
    } else if(listMedal[2].isLit==true){
      itemSecond = {
        medalId: 3,
        medalIsLit: true
      }
    } else if(listMedal[1].isLit==true){
      itemSecond = {
        medalId: 2,
        medalIsLit: true
      }
    } else if(listMedal[0].isLit==true){
      itemSecond = {
        medalId: 1,
        medalIsLit: true
      }
    } else {
      itemSecond = {
        medalId: 1,
        medalIsLit: false
      }
    }
    tempFirst.push(itemSecond);

    // 判断重复打卡勋章：找到最大的已点亮序号
    var itemThird = null
    if(listMedal[6].isLit==true){
      itemThird = {
        medalId: 7,
        medalIsLit: true
      }
    } else if(listMedal[5].isLit==true){
      itemThird = {
        medalId: 6,
        medalIsLit: true
      }
    } else if(listMedal[4].isLit==true){
      itemThird = {
        medalId: 5,
        medalIsLit: true
      }
    } else {
      itemThird = {
        medalId: 5,
        medalIsLit: false
      }
    }
    tempFirst.push(itemThird);

    // 开始逐步判断几个list
    this.data.listTwo.forEach(element => {
      itemFirst = {
        medalId: element,
        medalIsLit: listMedal[element-1].isLit,
        medalLitVenue: listMedal[element-1].litVenue
      }
      tempSecond.push(itemFirst)
    });
    this.data.listThird.forEach(element => {
      itemSecond = {
        medalId: element,
        medalIsLit: listMedal[element-1].isLit,
        medalLitVenue: listMedal[element-1].litVenue
      }
      tempThird.push(itemSecond)
    });

    this.setData({
      arrayFirst: tempFirst,
      arraySecond: tempSecond,
      arrayThird: tempThird
    })
  },

  // 处理选项卡点击事件
  handleTabClick({ index, tabsName}) {
    this.setData({
      [tabsName]: index
    })
  },

  // 处理运动类型选择事件
  bindPickerChange(e) {
    this.setData({
      videoTypeIndex: e.detail.value,
      videoType: this.data.videoTypeArray[e.detail.value].name,
    });
  },
  
  onTapMedal(res){
    // 获取子组件传回的勋章信息
    console.log('res: ', res)
    // 将该勋章所包含的所有场馆信息存在temp里
    let temp = []
    app.globalData.medalTotal[res.medalIdTap-1].venueList.forEach((item) => {
      temp.push(venueModel.getVenueDetail(item))
    });
    Promise.all(temp).then((venueList)=>{
      /* 将场馆分为已点亮和未点亮两部分传递给子组件 */
      // 如果勋章已点亮，则所有的场馆都已点亮
      if(res.medalIsLitTap){
        this.setData({
          venueLitTap: venueList
        })
      } 
      // 如果是含进度条的勋章，则将场馆分类
      else if(app.globalData.medalTotal[res.medalIdTap-1].venueList.length!=0){
        // 如果全都没点亮
        if(res.medalLitVenueTap.length==0){
          this.setData({
            venueNotLitTap: venueList
          })
        } else {
          var tempLit = [];
          var tempNotLit = [];
          venueList.forEach(element => {
            // 如果此场馆已被点亮，则存在tempLit中，否在存在tempNotLit中
            if(res.medalLitVenueTap.indexOf(element.venue_id)!=-1){
              tempLit.push(element)
            } else {
              tempNotLit.push(element)
            }
          });
          this.setData({
            venueLitTap: tempLit,
            venueNotLitTap: tempNotLit
          })
        }
      }
    })

    this.setData({
      showMask: true,
      medalNameTap: res.medalNameTap,
      medalImgSrcTap: res.medalImgSrcTap,
      medalConditionTap: app.globalData.medalTotal[res.medalIdTap-1].medalCondition
    })
  },

  // 退出蒙层
  maskClick() {
    this.setData({
      showMask: false
    })
  },

});
