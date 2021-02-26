var app = getApp()
import { UserModel } from '/models/usermodel'
var userModel = new UserModel()
Page({
  data: {
    show: true,
    maskZindex: 10,
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.getToken()
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
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  showCard(){
    my.navigateTo({
      url: '../TempStadium/TempStadium?id=1'
    });
  },
  getMedal(){
    my.navigateTo({
      url: '../getMedalTest/getMedalTest'
    });
  },
  maskClick(){
    this.setData({
      show: false
    });
  }
});
