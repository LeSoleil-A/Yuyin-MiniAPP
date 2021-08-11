Component({
  mixins: [],
  data: {},
  props: {
    srcImg: null,
    venueId: null
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    tapImg(){
      console.log('venueImg: ', this.props.venueId)
      my.reLaunch({
        url: '../../pages/MapPage/MapPage?type=vunueImg&venueId='+this.props.venueId
      });
    }
  },
});
