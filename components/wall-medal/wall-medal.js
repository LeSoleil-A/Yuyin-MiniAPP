var app = getApp()
import { MedalModel } from '../../models/medalmodel'
var medalModel = new MedalModel()

Component({
  mixins: [],
  data: {
    medalDetail: null
  },
  props: {
    medalName: "",
    medalId: "",
    medalCondition: "",
    venueList: []
  },
  async didMount(){
    const res = await medalModel.getMedalDetail(this.props.medalId)
    console.log(res)
    this.setData({
      medalDetail: res,
    });
  },
  didUnmount() {},
  methods: {
    toTapMedal(e){
      this.props.onTapMedal ({
        showModal: true,
        medalIdTap: this.props.medalId,
        medalImgSrcTap: this.data.medalDetail.medal_color_icon,
        medalNameTap: this.data.medalDetail.medal_name,
        medalConditionTap: this.props.medalCondition,
        venueIdListTap: this.props.venueList
      })
    }
  },
});
