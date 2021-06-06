Page({
  data: {
    props: {
      canIUse: false, //用户之前有没有授权过
      nickName: "",
      userImageSrc: ""
    },
  },
  onLoad() {},
  onReady() {
    this.animation = my.createAnimation({delay: 80, duration: 500});
    // 文字飞入效果
    this.animation.translateY(217).step();
    this.setData({animation: this.animation.export()})
  },
  tapBtn() {
      my.getOpenUserInfo({
        fail: (res) => {
          console.log("fail:" , res)
        },
        success: (res) => {
          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
          if (userInfo.code != "10000") {
            console.log("fail here:", userInfo.msg)
            this.setData({
              canIUse: false
            })
          } else {
            console.log("user: ", userInfo)
            this.setData({
              nickName: userInfo.nickName,
              userImageSrc: userInfo.avatar,
              canIUse: true
            })
            my.navigateTo({
              url: '/pages/MapPage/MapPage'
            });
          }
        },
      });
    }
});
