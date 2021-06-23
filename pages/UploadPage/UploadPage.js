Page({
  data: {
    modalOpened: false,
    buttons: [
      { text: '取消' },
      { text: '确定', extClass: 'buttonBold' },
    ],
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
