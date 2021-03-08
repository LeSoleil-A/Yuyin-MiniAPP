Page({
  data: {
    medalId: "",
    medalName: "",
    medalImgSrc: "",
    medalCondition: "",
    venueIdList: []
  },
  onLoad(query) {
    var venueListGot = JSON.parse(query.venueIdList);
    var medalUrl = decodeURIComponent(query.medalImgSrc);
    medalUrl = JSON.parse(medalUrl);
    this.setData({
      medalId: query.medalId,
      medalName: query.medalName,
      medalImgSrc: medalUrl,
      medalCondition: query.medalCondition,
      venueIdList: venueListGot
    });
  },
});
