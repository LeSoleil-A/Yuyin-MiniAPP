var app = getApp()
import { UserModel } from '/models/usermodel'
var userModel = new UserModel()

import { VenueModel } from '../../models/venuemodel'
var venueModel = new VenueModel()

import { MedalModel } from '../../models/medalmodel'
var medalModel = new MedalModel()

Page({
  data: {
    people_number: 1,
    white_board_number: 1,
    white_board_width: 16,
    wihte_board_height: 25,
    white_board_info: [
    ],

    museums: [],
    LitVenue: [],

    // 选择的场馆ID
    chosenIndex: 17,
    challengeName: "天地太极",
    challengeImg: "http://www.next.zju.edu.cn/share/yuyin/teakwondo.png",

    first_click: false,
    bubble_x: '100px',
    bubble_y: '100px',
    have_a_try_x: 169.5,
    have_a_try_y: 347,
    showIntro: false,
    medal_id: -1,
    medalName: "勋章名称",
    modalImgSrc: "",
    showMedal: false,
    show: false,
    curr_isLit: false,
    // water_bg:'/image/water_e.png',
    // ball_bg:'/image/ball_e.png',
    // com_bg:'/image/com_e.png',
    // rivalry_bg:'/image/rivalry_e.png',
    // water_color: '#3C54EF',
    // ball_color: '#00CA90',
    // com_color: '#FD7A34',
    // rivalry_color: '#EC0887',
    // water_visible:false,
    // ball_visible:false,
    // com_visible:false,
    // rivalry_visible:false,
    venueDetail:null,
  },

  onModalClose() {
    // console.log("close")
    this.setData({
      show: false,
    });
  },
  onModalMedalClose() {
    this.setData({
      showMedal: false,
    });
  },
  joinBtnTapped() {
    this.setData({
      showIntro: false,
    });
  },

  onLoad (query) {
    this.setData({
      museums: app.globalData.museums
    })
    console.log(`Page onLoad with query: `, query.type);

    if(query.type=="vunueImg"){
      const tapIndex = query.venueId-1
      const tapX = this.data.museums[query.venueId-1].x
      const tapY = this.data.museums[query.venueId-1].y
      const tapChallenge = this.data.museums[query.venueId-1].templete_name

      this.setData({
        chosenIndex: tapIndex,
        challengeName: tapChallenge,
        have_a_try_x: tapX-30,
        have_a_try_y: tapY-110,
      })
    }

    var number = 0
    this.setData({
      people_number: number
    })

    this.dealNumber(number)
  },

  onReady () {
    this.animation = my.createAnimation({duration: 300});

    // 设置循环动画
    var next = true;
    setInterval(function(){
        if(next) {
          this.animation.rotate(20).step()
          next = !next;
        } else {
          this.animation.rotate(-20).step()
          next = !next;
        }
        this.setData({ animation: this.animation.export() })
      }.bind(this), 300)
  },

  onShow (query) {
    //console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.fetchMuseumsAndLitDetail()
    // this.getToken()
    // this.fetchMuseumsAndLitDetail()
    // if (this.data.medal_id >= 0) {
    //   this.fetchMedalDetail(this.data.medal_id)
    // }
    // // Every time for debug
    // // my.clearStorageSync();
    // let res = my.getStorageSync({ key: 'isFirstTime' });
    // if (res.data == null) {
    //   this.setData({
    //     showIntro : true
    //   })
    //   my.setStorageSync({
    //   key: 'isFirstTime',
    //   data: {
    //     value: true,
    //   }
    //   });
    // }
    // let c_res = my.getStorageSync({ key: 'isFirstTimeClick' });
    // console.log("Hello");
    // console.log(c_res);
    // if (c_res.data == null) {
    //   this.setData({
    //     first_click : false
    //   })
    //   my.setStorageSync({
    //   key: 'isFirstTimeClick',
    //   data: {
    //     value: false,
    //   }
    //   });
    // } else {
    //   this.setData({
    //     first_click : c_res.data['value']
    //   })
    // }
  },

  dealNumber(number) {
    var number_length = String(number).length
    var new_white_board_info = []
    // console.log(new_white_board_info)
    for (let index = 0; index < number_length; index++) {
      new_white_board_info.push({no:index + 1, number:String(number)[index]})
    }
    this.setData({
      white_board_number: number_length,
      white_board_info: new_white_board_info,
    })
  },

  // getToken() {
  //   my.getAuthCode({
  //     scopes: 'auth_user',
  //     success: async (res) => {
  //       let result = await userModel.getToken(res.authCode)
  //       my.setStorageSync({ key:'auth_code', data: res.authCode })
  //       my.setStorageSync({key:'token',data:result.token})
  //     },
  //   })
  // },

  async fetchMuseumsAndLitDetail() {
    const res = await venueModel.getLitDetail()
    
    this.setData({
      LitVenue : res
    })
  },

  async fetchMedalDetail(medalID) {
    const res = await medalModel.getMedalDetail(medalID)
    this.setData({
      medalName: res.medal_name,
      modalImgSrc: res.medal_color_icon,
    })
    console.log(res.medal_color_icon)
    this.setData({
      showMedal: true,
    })
  },

  async showCard(id){
    const res = await venueModel.getVenueDetail(id)
    var isLit = false
    for (let index = 0; index < this.data.museums.length; index++) {
      if (this.data.museums[index].id == id) {
        isLit = this.data.museums[index].isLit
      }
    }
    this.setData({
      curr_isLit: isLit,
      venueDetail:res,
      show: true,
    });
  },

  // 处理亚运场馆的点击事件
  museumButtonTapped (e) {
    console.log("Tap museum: ", this.data.museums[e.currentTarget.id])

    const tapIndex = e.currentTarget.id
    const tapX = this.data.museums[e.currentTarget.id].x
    const tapY = this.data.museums[e.currentTarget.id].y
    const tapChallenge = this.data.museums[e.currentTarget.id].templete_name
    const tapImage = this.data.museums[e.currentTarget.id].templete_img

    this.setData({
      chosenIndex: tapIndex,
      challengeName: tapChallenge,
      challengeImg: tapImage,
      have_a_try_x: tapX-30,
      have_a_try_y: tapY-110,
    })
  },

  videoPlaygroundTapped (e) {
    console.log(e);
    my.navigateTo({
      url: 'video'
    });
  },

  jumpToVenue () {
    console.log("chosenIndex: ", this.data.chosenIndex);
    my.navigateTo({
      url: '../VenueDetail/VenueDetail?venueIndex=' + this.data.chosenIndex
    });
  },

  jumpToMyPage () {
    console.log("navigate");
    my.navigateTo({
      url: '../HomePage/HomePage'
    });
  },


  // routeTapped (e) {
  //   console.log(e.currentTarget.id);
  //   var tap_id = e.currentTarget.id;
  //   if (tap_id == 1) {
  //     this.setData({
  //       water_bg:'/image/water_f.png',
  //       ball_bg:'/image/ball_e.png',
  //       com_bg:'/image/com_e.png',
  //       rivalry_bg:'/image/rivalry_e.png',
  //       water_color: '#FFFFFF',
  //       ball_color: '#00CA90',
  //       com_color: '#FD7A34',
  //       rivalry_color: '#EC0887',
  //       water_visible:true,
  //       ball_visible:false,
  //       com_visible:false,
  //       rivalry_visible:false,
  //     })
  //   }
  // }
});


