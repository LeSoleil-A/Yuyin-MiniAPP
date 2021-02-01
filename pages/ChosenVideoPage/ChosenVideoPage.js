Page({
  data: {
    res:"",
  },
  onLoad(query) {
    console.log(query.res);
    this.setData({
      res: query.res,
    });
  },
  Upload() {
    console.log("Upload");
  },
  Refilm() {
    my.navigateBack({
      url: '../TeachingPage/TeachingPage'
    });
  }
});
