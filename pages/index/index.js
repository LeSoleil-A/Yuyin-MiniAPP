var app = getApp()
import { UserModel } from '/models/usermodel'
var userModel = new UserModel()

import { VenueModel } from '../../models/venuemodel'
var venueModel = new VenueModel()

Page({
  data: {
    show: false,
    showMedal: false,
    venueDetail:null
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
  async showCard(){
    const id = 3
    const res = await venueModel.getVenueDetail(id)
    console.log(res)
    this.setData({
      venueDetail:res,
      show: true,
    });
  },
  getMedal(){
    this.setData({
      showMedal: true,
    });
  },
  onModalClose() {
    this.setData({
      show: false,
    });
  },
  onModalMedalClose() {
    this.setData({
      showMedal: false,
    });
  }
});
