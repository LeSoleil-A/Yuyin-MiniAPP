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
    medalIsLitTap: false,
    medalLitVenueTap: [],
    medalNameTap: "",
    medalImgSrcTap: null,
    medalConditionTap: "",
    venueLitTap: [],
    venueNotLitTap: [],

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
    /* medalGet中应包含：
        medal_id, medal_name, medalImgSrc(color), medalIsLit, 
        progress, litVenue, medalCondition, venueList, 
        proHidden*/
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
          medalIsLit: true,
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
    })

    /* medalNotGet中应包含：
        medal_id, medal_name, medalImgSrc(gray), medalIsLit, 
        progress, litVenue, medalCondition, venueList, 
        proHidden*/
    const resNotGet = [];
    const notGetItem = [];
    tempNotGet.forEach((item) => {
      resNotGet.push(medalModel.getMedalDetail(item.id))
    });
    Promise.all(resNotGet).then((resNotGet)=>{
      resNotGet.forEach((item) => {
        var proHidden = false;
        // 里程碑勋章及杭州勋章不含进度条
        if ((item.medal_id<=12 && item.medal_id>=1) || (item.medal_id==20)){
          proHidden = true
        }
        var resNotGetItem = {
          medalId : item.medal_id,
          medalName : item.medal_name,
          medalImgSrc: item.medal_gray_icon,
          medalIsLit: false,
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
    })
  },

  // 处理勋章点击事件
  onTapMedal(res){
    // 获取子组件传回的勋章信息
    // console.log('res: ', res)
    // 将该勋章所包含的所有场馆信息存在temp里
    let temp = []
    res.venueIdListTap.forEach((item) => {
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
      else if(res.venueIdListTap.length!=0){
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

      console.log('venueLitTap', this.data.venueLitTap)
      console.log('venueNotLitTap', this.data.venueNotLitTap) 
    })

    this.setData({
      showModal: true,
      medalIsLitTap: res.medalIsLit,
      medalLitVenueTap: res.litVenue,
      medalNameTap: res.medalNameTap,
      medalImgSrcTap: res.medalImgSrcTap,
      medalConditionTap: res.medalConditionTap
    })
  },
  onModalClose(){
    this.setData({
      showModal: false,
      medalIsLitTap: false,
      medalLitVenueTap: [],
      medalNameTap: "",
      medalImgSrcTap: null,
      medalConditionTap: "",
      venueLitTap: [],
      venueNotLitTap: []
    })
  },
  seeMore() {
    my.navigateTo({
      url: '../MedalWallPage/MedalWallPage'
    });
  },
});
