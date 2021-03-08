Component({
  mixins: [],
  data: {},
  props: {
    medalDetail:"",
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    toTapMedal(e){
      this.props.onTapMedal ({
        medalIdTap: this.props.medalDetail.medalId,
        medalImgSrcTap: this.props.medalDetail.medalImgSrc,
        medalNameTap: this.props.medalDetail.medalName,
        medalConditionTap: this.props.medalDetail.medalCondition,
        venueIdListTap: this.props.medalDetail.venueList
      })
    }
  },
});
