var app = getApp();
const plugin = requirePlugin('myPlugin');

Page({
  data: {
    venueId: "",

    tempoId: "1",
    motionId: "1",
    sceneId: "1",

    getRes: false,
    mediaResponse: null,
    chosenVideoPath: "",
    bizIdChosen: "",

    canShake: false,
    canChoose: true,

    tempoTypes: [
      {
        id: 1,
        name: "动感",
      },{
        id: 2,
        name: "自然",
      },{
        id: 3,
        name: "舒缓",
      },
    ],

    motionTypes: [
      {
        id: 1,
        name: "快乐",
      },{
        id: 2,
        name: "悲伤",
      },{
        id: 3,
        name: "酷炫",
      },{
        id: 4,
        name: "冒险",
      },{
        id: 5,
        name: "力量",
      },{
        id: 6,
        name: "有趣",
      },{
        id: 7,
        name: "梦想",
      },{
        id: 8,
        name: "律动",
      },{
        id: 9,
        name: "放松",
      },{
        id: 10,
        name: "浪漫",
      },
    ],

    sceneTypes: [
      {
        id: 1,
        name: "健身",
      },{
        id: 2,
        name: "奔跑",
      },{
        id: 3,
        name: "热身",
      },{
        id: 4,
        name: "散步",
      },{
        id: 5,
        name: "街头",
      },{
        id: 6,
        name: "对决",
      },{
        id: 7,
        name: "球场",
      },{
        id: 8,
        name: "竞技",
      },{
        id: 9,
        name: "水上",
      },
    ],
  },

  onLoad(options) {
    console.log("venueId: ", options.venueId);
    console.log("venueName: ",app.globalData.museums[options.venueId-1].name);
    // 记录一下场馆Id和场景码
    this.setData({
      venueId: options.venueId,
      bizIdChosen: app.globalData.museums[options.venueId-1].bizId
    })
    console.log("bizId: ", this.data.bizIdChosen);

    const randVenue = Math.round(Math.random());
    const randMotion = Math.ceil(Math.random()*10);

    this.setData({
      motionId: randMotion+1
    })

    switch (this.data.venueId) {
      case "1":
        if(randVenue==0){
          this.setData({
            tempoId: "1",
            sceneId: "7",
          })
        } else {
          this.setData({
            tempoId: "1",
            sceneId: "2",
          })
        }
        break;

      case "2":
        if(randVenue==0){
          this.setData({
            tempoId: "3",
            sceneId: "4",
          })
        } else {
          this.setData({
            tempoId: "3",
            sceneId: "5",
          })
        }
        break;

      case "3":
        if(randVenue==0){
          this.setData({
            tempoId: "3",
            sceneId: "3",
          })
        } else {
          this.setData({
            tempoId: "3",
            sceneId: "5",
          })
        }
        break;

      case "4":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "9",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "1",
          })
        }
        break;

      case "5":
        if(randVenue==0){
          this.setData({
            tempoId: "1",
            sceneId: "6",
          })
        } else {
          this.setData({
            tempoId: "1",
            sceneId: "1",
          })
        }
        break;

      case "6":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "7",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "2",
          })
        }
        break;

      case "7":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "8",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "6",
          })
        }
        break;

      case "8":
        if(randVenue==0){
          this.setData({
            tempoId: "1",
            sceneId: "2",
          })
        } else {
          this.setData({
            tempoId: "1",
            sceneId: "5",
          })
        }
        break;

      case "9":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "9",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "8",
          })
        }
        break;

      case "10":
        if(randVenue==0){
          this.setData({
            tempoId: "1",
            sceneId: "6",
          })
        } else {
          this.setData({
            tempoId: "1",
            sceneId: "5",
          })
        }
        break;

      case "11":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "6",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "1",
          })
        }
        break;

      case "12":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "7",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "6",
          })
        }
        break;

      case "13":
        if(randVenue==0){
          this.setData({
            tempoId: "3",
            sceneId: "8",
          })
        } else {
          this.setData({
            tempoId: "3",
            sceneId: "1",
          })
        }
        break;
      
      case "14":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "4",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "3",
          })
        }
        break;

      case "15":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "6",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "8",
          })
        }
        break;

      case "16":
        if(randVenue==0){
          this.setData({
            tempoId: "1",
            sceneId: "9",
          })
        } else {
          this.setData({
            tempoId: "1",
            sceneId: "3",
          })
        }
        break;

      case "17":
        if(randVenue==0){
          this.setData({
            tempoId: "2",
            sceneId: "8",
          })
        } else {
          this.setData({
            tempoId: "2",
            sceneId: "5",
          })
        }
        break;

      case "18":
        if(randVenue==0){
          this.setData({
            tempoId: "1",
            sceneId: "6",
          })
        } else {
          this.setData({
            tempoId: "1",
            sceneId: "3",
          })
        }
        break;
    
      default:
        break;
    }
  },

  async onReady() {
    const response = await plugin.invokeMediaEditor({
      bizId: this.data.bizIdChosen,
      showLoading: true,
      // scrType: 'camera' | 'album',
      params: {
        skipEdit: true,
      },
    });
    console.log("response:");
    console.log(response);
    // console.log(response.data.medias[0].videoPath);

    // 如果用户没有选择视频，则返回原来的页面
    if(response.success == false) {
      console.log("没有视频！");
      my.navigateBack();
    }

    else {
      this.setData({
        getRes: true,
        mediaResponse: response,
        chosenVideoPath: response.data.medias[0].videoPath,
      });
    }

    // 展示配乐推荐文字
    

    const randFilter = Math.round(Math.random());
    if('middleEditResult' in response.data){
      // 获取滤镜信息
      var filterString = response.data.middleEditResult[0].usingEffectlist[0];

      if(filterString.indexOf("红")!=-1){
        if(randFilter==0){
          this.setData({
            motionId: "1",
          })
        } else {
          this.setData({
            motionId: "5",
          })
        }
        return;
      }

      if(filterString.indexOf("黄")!=-1){
        if(randFilter==0){
          this.setData({
            motionId: "2",
          })
        } else {
          this.setData({
            motionId: "10",
          })
        }
        return;
      }

      if(filterString.indexOf("绿")!=-1){
        if(randFilter==0){
          this.setData({
            motionId: "6",
          })
        } else {
          this.setData({
            motionId: "4",
          })
        }
        return;
      }
      
      if(filterString.indexOf("紫")!=-1){
        if(randFilter==0){
          this.setData({
            motionId: "3",
          })
        } else {
          this.setData({
            motionId: "8",
          })
        }
        return;
      }

      if(filterString.indexOf("蓝")!=-1){
        if(randFilter==0){
          this.setData({
            motionId: "10",
          })
        } else {
          this.setData({
            motionId: "7",
          })
        }
        return;
      }
      
      if(filterString.indexOf("白")!=-1){
        if(randFilter==0){
          this.setData({
            motionId: "2",
          })
        } else {
          this.setData({
            motionId: "9",
          })
        }
        return;
      }
    }
  },

  changeTempoId(e) {
    const { value } = e.target.dataset;
    this.setData({
      tempoId: value,
    });
  },
  changeMotionId(e) {
    const { value } = e.target.dataset;
    this.setData({
      motionId: value,
    })
  },
  changeSceneId(e) {
    const { value } = e.target.dataset;
    this.setData({
      sceneId: value,
    })
  },

  // nextStep: function() {
  //   console.log("tempoId: ", this.data.tempoId);
  //   console.log("motionId: ", this.data.motionId);
  //   console.log("sceneId: ", this.data.sceneId);
  //   const passRes = JSON.stringify(this.data.mediaResponse);
  //   my.navigateTo({
  //     url: '/pages/UploadPage/UploadPage?venueId=' + this.data.venueId + '&passRes=' + passRes
  //   });
  // },

  // toShake: function() {
  //   console.log("tempoId: ", this.data.tempoId);
  //   console.log("motionId: ", this.data.motionId);
  //   console.log("sceneId: ", this.data.sceneId);
  //   this.setData({
  //     canShake: true
  //   });
  //   const passRes = JSON.stringify(this.data.mediaResponse);
  //   my.watchShake({
  //     success:() => {
  //       my.navigateTo({
  //         url: '/pages/UploadPage/UploadPage?venueId=' + this.data.venueId + '&passRes=' + passRes
  //       });
  //     }
  //   });
  // },

  toChose() {
    const passRes = JSON.stringify(this.data.mediaResponse);
    this.setData({
      canChoose: false
    }, () => {
      setTimeout(() => {
        this.setData({
          canChoose: true
        });
        my.navigateTo({
          url: '/pages/AddMusicPage/AddMusicPage?venueId=' + this.data.venueId + '&passRes=' + passRes
        });
      }, 2000);
    });
  },

  // onModalClick() {
  //   this.setData({
  //     canShake: false
  //   })
  // }
});
