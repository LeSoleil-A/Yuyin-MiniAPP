var app = getApp();

Page({
  data: {
    venueId: "",
    resultVideo: null,

    videoThumbnail: "",

  },

  onLoad(options) {
    const getRes = JSON.parse(options.resultVideo);
    this.setData({
      resultVideo: getRes,
      venueId: options.venueId,
      videoThumbnail: getRes.data.medias[0].videoThumbnail
    });
  },

  btnBack() {
      my.reLaunch({
        url: '/pages/MapPage/MapPage'
      });
    }
});
