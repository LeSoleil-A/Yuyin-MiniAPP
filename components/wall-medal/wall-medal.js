var app = getApp()
import { MedalModel } from '../../models/medalmodel'
var medalModel = new MedalModel()

Component({
  mixins: [],
  data: {
    medalDetail: null,
    medalWallName: "",
    medalName: "",
    medalCondition: "",
    medalImgSrc: ""
  },
  props: {
    medalId: "",
    medalIsLit: "",
    medalLitVenue: []
  },
  
  async didMount(){
    const res = await medalModel.getMedalDetail(this.props.medalId)
    // console.log("medalId: ", this.props.medalId)
    // console.log("medalDetail: ", res)
    this.setData({
      medalDetail: res,
      medalName: res.medal_name,
      medalWallName: app.globalData.medalTotal[this.props.medalId-1].medalWallName,
      medalCondition: app.globalData.medalTotal[this.props.medalId-1].medalCondition
    });
    if(this.props.medalIsLit){
      this.setData({
        medalImgSrc: res.medal_color_icon,
      });
    } else {
      this.setData({
        medalImgSrc: res.medal_gray_icon,
      });
    }
  },

  didUnmount() {},
  methods: {
    toTapMedal(e){
      this.props.onTapMedal ({
        medalIdTap: this.props.medalId,
        medalNameTap: this.data.medalName,
        medalImgSrcTap: this.data.medalImgSrc,
        medalIsLitTap: this.props.medalIsLit,
        medalLitVenueTap: this.props.medalLitVenue
      })
    }
  },
});
