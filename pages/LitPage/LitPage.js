var app = getApp();

Page({
  data: {
    venueId: "",
    resultVideo: null,

    venueName: "",
    videoThumbnail: "",

  },

  
  onLoad(options) {
    const getRes = JSON.parse(options.resultVideo);
    this.setData({
      resultVideo: getRes,
      venueId: options.venueId,
      venueName: app.globalData.museums[options.venueId-1].name,
      videoThumbnail: getRes.data.medias[0].videoThumbnail
    });
  },

  btnBack() {
      my.reLaunch({
        url: '/pages/MapPage/MapPage'
      });
    }
});
