Component({
  mixins: [],
  data: {},
  props: {
    canIUse: false, //用户之前有没有授权过
    nickName: "",
    userImageSrc: ""
  },
  didMount() {
    this.authorize();
  },
  didUpdate() { },
  didUnmount() { },

  methods: {
    authorize() {
      var that = this
      my.getOpenUserInfo({
        fail: (res) => {
          console.log("fail:" , res)
        },
        success: (res) => {
          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
          if (userInfo.code != "10000") {
            console.log("fail here:", userInfo.msg)
            that.setData({
              canIUse: false
            })
          } else {
            console.log("name: ", userInfo)
            that.setData({
              nickName: userInfo.nickName,
              userImageSrc: userInfo.avatar,
              canIUse: true
            })
          }
        },
      });
    },
    onGetAuthorize() {
      this.authorize()
    },
  },
});
