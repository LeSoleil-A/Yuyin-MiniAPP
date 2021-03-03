Page({
  data: {
    venueId: ""
  },
  onLoad(query) {
    console.log("得到的venue_id: " + query.venueId);
    this.setData({
      venueId: query.venueId,
    });
  },
});
