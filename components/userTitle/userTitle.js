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
          console.log(res)
        },
        success: (res) => {
          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
          if (userInfo.code != "10000") {
            that.setData({
              canIUse: false
            })
          } else {
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
