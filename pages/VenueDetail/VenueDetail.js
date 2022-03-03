var app = getApp()

Page({
  data: {
    venueIndex: "",
    venueId: "",

    challengeName: "创意射门",
    venueName: "江干区体育中心体育场",
    challengeVideo: "XNTIwMzY2NjM3Ng==",
    challengeInfo: "用任何工具模仿做出足球射门动作，看看谁的脑洞更有创意。",
  },
  onLoad(options) {
    console.log("venue: ", options.venueIndex)
    this.setData({
      venueId: app.globalData.museums[options.venueIndex].id,
      challengeName: app.globalData.museums[options.venueIndex].templete_name,
      venueName: app.globalData.museums[options.venueIndex].name,
      challengeVideo: app.globalData.museums[options.venueIndex].video,
      challengeInfo: app.globalData.museums[options.venueIndex].templete_intro,
    })
  },

  async tapBtn() {
    my.navigateTo({
      url: '/pages/MusicTagPage/MusicTagPage?venueId=' + this.data.venueId
    });
  }
});