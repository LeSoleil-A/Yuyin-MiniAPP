Page({
  data: {
    showBottom: false,
    teaching: {
      src: "XNDM0OTQzMDc2OA==",
    },
    array: [{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },{
      src: "XNDM0OTQzMDc2OA==",
    }, {
      src: "XNDM0OTQzMDc2OA==",
    },
    ],
  },
  onLoad() {
    this.setData({
      showBottom: false,
    });
  },
  onHide(){
    this.setData({
      showBottom: false,
    });
  },
  btnTap() {
    this.setData({
      showBottom: true,
    });
  },
  onPopupClose() {
    this.setData({
      showBottom: false,
    });
  },
  FromCamera() {
    my.chooseVideo({
      sourceType: ['camera'],
      camera: 'back',
      compressed: 100,
      success(res) {
        console.log(res.tempFilePath);
        my.navigateTo({
          url: '../ChosenVideoPage/ChosenVideoPage?res='+res.tempFilePath
        });
      }
    });
  },
  FromAlbum() {
    my.chooseVideo({
      sourceType: ['album'],
      compressed: 100,
      success(res) {
        console.log(res.tempFilePath);
        my.navigateTo({
          url: '../ChosenVideoPage/ChosenVideoPage?res='+res.tempFilePath
        });
      }
    });
  }
});
