var app = getApp()
import { VenueModel } from '../../models/venuemodel'
var venueModel = new VenueModel()

Component({
  mixins: [],
  data: {
  },
  props: {
    medalImgSrc: "",
    medalName: "",
    medalCondition: "",
    venueList: []
  },
  didMount(){},
  didUpdate() {},
  didUnmount() {},
  methods: {
    btnTap(e){
      console.log(this.data.medalCondition)
    }
  },
});
