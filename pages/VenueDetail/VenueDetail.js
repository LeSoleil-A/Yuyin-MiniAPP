// import invokeMediaEditor from '@alipay/creator'

Page({
  data: {},
  onLoad() {},

  async tapBtn() {
    my.navigateTo({
      url: '/pages/UploadPage/UploadPage'
    });

    // const response = await invokeMediaEditor({
    //   bizId: 'sceneCode',
    //   params: {
    //     skipEdit: true,
    //   }
    // })
  }
});