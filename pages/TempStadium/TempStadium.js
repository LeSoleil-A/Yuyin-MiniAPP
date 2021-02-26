import { VenueModel } from '../../models/venuemodel'
var venueModel = new VenueModel()

Page({
  data: {
    venueDetail:null
  },
  async onLoad(query) {
    const id = query.id
    const res = await venueModel.getVenueDetail(id)
    console.log(res)
    this.setData({
      venueDetail:res
    })
  },
});
