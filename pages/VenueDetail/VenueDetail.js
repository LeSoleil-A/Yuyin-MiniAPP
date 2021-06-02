Page({
  data: {},
  onLoad() {},

  tapBtn() {
    my.navigateTo({
      url: '/pages/UploadPage/UploadPage'
    });

    // my.navigateToMiniProgram({
    //   appId: 'xxxx',
    //   path: 'pages/index/index',
    //   extraData:{
    //     "data1":"test"
    //   },
    //   success: (res) => {
    //     console.log(JSON.stringify(res))
    //   },
    //   fail: (res) => {
    //     console.log(JSON.stringify(res))
    //   }
    // });
  }
});