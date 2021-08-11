Page({
  data: {
    // 用户信息
    nickName: "支付宝用户名",
    userImageSrc: "",
    canIUse: "",

    modalOpened: false,
    buttons: [
      { text: '取消' },
      { text: '确定', extClass: 'buttonBold' },
    ],
  },
  async onShow(){
    // 获取用户信息，之后要改为直接从前面获取
    my.getOpenUserInfo({
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
          if (userInfo.code != "10000") {
            this.setData({
              canIUse: false
            })
          } else {
            this.setData({
              nickName: userInfo.nickName,
              userImageSrc: userInfo.avatar,
              canIUse: true
            })
          }
        },
    });
  },
  onReady() {
    if (my.canIUse('hideBackHome')) {
      my.hideBackHome()
    }
  },
  // onUnload() {
  //   // this.setData({
  //   //   modalOpened: true,
  //   // })
  //   my.confirm({
  //     title: '温馨提示',
  //     content: '您是否想查询快递单号：\n1234567890',
  //     confirmButtonText: '马上查询',
  //     cancelButtonText: '暂不需要',
  //     success: (result) => {
  //       my.alert({
  //         title: `${result.confirm}`,
  //       });
  //     },
  //   });
  // },
  onButtonClick(e) {
    const { target: { dataset } } = e;
    this.setData({
      modalOpened: false,
    });
    my.alert({
      title: `点击了：${JSON.stringify(dataset)}`,
      buttonText: '关闭',
    });
  },
  tapBtn() {
    my.navigateTo({
      url: '/pages/LitPage/LitPage'
    });
  }
});
