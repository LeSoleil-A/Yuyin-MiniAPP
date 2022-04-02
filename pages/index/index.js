var app = getApp()
import { UserModel } from '/models/usermodel'
var userModel = new UserModel()

Page({
  data: {
    props: {
      canIUse: false, //用户之前有没有授权过
      nickName: "",
      userImageSrc: ""
    },

    // 后端传入数据
    userNumber: 0,
  },

  onLoad() {    },
  
  onShow(query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.getToken()
    // Every time for debug
    // my.clearStorageSync();
  },

  onReady() {
    this.animation = my.createAnimation({delay: 80, duration: 500});
    // 文字飞入效果
    this.animation.translateX(250).step();
    this.setData({animation: this.animation.export()})
  },

  getToken() {
    my.getAuthCode({
      scopes: 'auth_user',
      success: async (res) => {
        let result = await userModel.getToken(res.authCode)
        my.setStorageSync({ key:'auth_code', data: res.authCode })
        my.setStorageSync({key:'token',data:result.token})
      },
    })
  },

  // 获取用户授权、跳转到地图界面
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
              url: '/pages/MapPage/MapPage?type=index'
            });
          }
        },
      });
    }
});
