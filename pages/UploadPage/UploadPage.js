var app = getApp();
const plugin = requirePlugin('myPlugin');

Page({
  data: {
    venueId: "",

    // 用户信息
    nickName: "支付宝用户名",
    userImageSrc: "",
    canIUse: "",
    videoEditedPath: "",

    response: null,

    getEdited: false,
    editedResponse: null,

    modalOpened: false,
    buttons: [
      { text: '取消' },
      { text: '确定', extClass: 'buttonBold' },
    ],
  },

  onLoad(options) {
    const getRes = JSON.parse(options.passRes);
    this.setData({
      response: getRes,
      venueId: options.venueId,
    });
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


  async onReady() {
    if (my.canIUse('hideBackHome')) {
      my.hideBackHome()
    };

    const editedResult = await plugin.openEditPage({
      bizId: app.globalData.museums[this.data.venueId-1].bizId,
      showLoading: true,
      params: {
        mediaData: this.data.response.data.medias[0],
        middleEditResult: this.data.response.data.middleEditResult,
        enableEditor: true,
      },
      selectedMaterials: [{
        type: 'music',
        code: 'M220220311144307683',
        url: 'https://mdn.alipayobjects.com/antmedia/afts/file/A*lv2JQabMI4oAAAAAAAAAAAAAARInAQ',
      }],

    });

    console.log("editedResult:");
    console.log(editedResult);

    if(editedResult.success == false){
      console.log("放弃编辑！");
      my.navigateBack();
    }

    else {
      this.setData({
        editedResponse: editedResult,
        videoEditedPath: editedResult.data.medias[0].videoPath,
        getEdited: true
      });
    }
  },
  
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
    const passRes = JSON.stringify(this.data.editedResponse);
    my.navigateTo({
      url: '/pages/LitPage/LitPage?resultVideo=' + passRes + '&venueId=' + this.data.venueId
    });
  }
});
