import { HTTP } from "../util/http"

class VenueModel extends HTTP {
  async getVenueDetail(venueId) {
    return this.request({
      url: 'v1/venue/detail', 
      data: {
        "venue_id": venueId
      },
      method:'get'
    })
  }
}



export { VenueModel }