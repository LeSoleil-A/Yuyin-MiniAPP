var app = getApp()
import { MedalModel } from '/models/medalmodel'
var medalModel = new MedalModel()
import { VenueModel } from '../../models/venuemodel'
var venueModel = new VenueModel()

Page({
  data: {
    canIUseAuthButton: true,
    medalGet: [],
    medalNotGet: [],
    showModal: false,
    tapMedal: null,
    medalNameTap: "",
    medalImgSrcTap: null,
    medalConditionTap: "",
    venueListTap: [],
    src: "XNDM0OTQzMDc2OA==",
  },
  async onLoad() {

    // 得到勋章的点亮情况
    const res = await medalModel.getMedalLit();

    // 将已经得到的和没有得到的勋章分组
    let tempGet = [];
    let tempNotGet = [];
    res.forEach((item) => {
      console.log('get: ' , item.isLit)
      if (item.isLit==false){
        tempNotGet.push(item)
      } else {
        tempGet.push(item)
      }
    });
    
    // 根据上述编号分别获取勋章详情，以便后面区分彩色与灰色图片；同时将勋章的进度及已点亮场馆进行存储
    // medalGet中应包含：medal_id, medal_name, medal_color_icon, progress, litVenue
    const resGet = [];
    const getItem = [];
    tempGet.forEach((item) => {
      resGet.push(medalModel.getMedalDetail(item.id))
    });
    Promise.all(resGet).then((resGet)=>{
      resGet.forEach((item) => {
        var proHidden = false;
        if (item.medal_id<=12 && item.medal_id>=1){
          proHidden = true
        }
        var resGetItem = {
          medalId : item.medal_id,
          medalName : item.medal_name,
          medalImgSrc: item.medal_color_icon,
          progress: res[item.medal_id-1].progress,
          litVenue: res[item.medal_id-1].litVenue,
          medalCondition: app.globalData.medalTotal[item.medal_id-1].medalCondition,
          venueList: app.globalData.medalTotal[item.medal_id-1].venueList,
          proHidden: proHidden
        };
        getItem.push(resGetItem);
      });
      
      this.setData({
        medalGet: getItem
      });
      console.log('medalGet: ' , this.data.medalGet)
    })

    const resNotGet = [];
    const notGetItem = [];
    tempNotGet.forEach((item) => {
      resNotGet.push(medalModel.getMedalDetail(item.id))
    });
    Promise.all(resNotGet).then((resNotGet)=>{
      resNotGet.forEach((item) => {
        var proHidden = false;
        if (item.medal_id<=12 && item.medal_id>=1){
          proHidden = true
        }
        var resNotGetItem = {
          medalId : item.medal_id,
          medalName : item.medal_name,
          medalImgSrc: item.medal_gray_icon,
          progress: res[item.medal_id-1].progress,
          litVenue: res[item.medal_id-1].litVenue,
          medalCondition: app.globalData.medalTotal[item.medal_id-1].medalCondition,
          venueList: app.globalData.medalTotal[item.medal_id-1].venueList,
          proHidden: proHidden
        };
        notGetItem.push(resNotGetItem);
      });
      
      this.setData({
        medalNotGet: notGetItem
      });
      // console.log('medalNotGet: ' , this.data.medalNotGet)
    })
  },
  onTapMedal(res){
    console.log('res: ', res)
    let temp = []
    res.venueIdListTap.forEach((item) => {
      temp.push(venueModel.getVenueDetail(item))
    });
    Promise.all(temp).then((e)=>{
      this.setData({
        venueListTap: e,
      });
    })
    this.setData({
      showModal: true,
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
  seeMore() {
    my.navigateTo({
      url: '../MedalWallPage/MedalWallPage'
    });
  },
});
