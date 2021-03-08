var app = getApp()
import { UserModel } from '/models/usermodel'
var userModel = new UserModel()

import { VenueModel } from '../../models/venuemodel'
var venueModel = new VenueModel()

Page({
  data: {
    show: false,
    curr_isLit: false,
    water_bgc:"#FF9088",
    ball_bgc:"#FF9088",
    com_bgc:"#FF9088",
    rivalry_bgc:"#FF9088",
    water_visible:false,
    ball_visible:false,
    com_visible:false,
    rivalry_visible:false,
    venueDetail:null,
    museums: [
      {
        "id":"18",
        "x": 29.5,
        "y": 47,
        "name":"临安文体会展中心",
        "intro":"亚运会摔跤、跆拳道项目比赛场馆，位于杭州市临安区锦南新城，在亚运村南方且项目约64公里。按照“两馆一场”布局，用地面积约161亩，建筑面积34060平方米，观众席数约3728个。",
        "sport":"跆拳道",
        "templete_name":"天地太极",
        "templete_intro":"礼仪廉耻、忍耐克己、百折不屈，练习品势动作，感受跆拳道精神。",
        "isLit":false,
        "img":"lawthzzx",
      },
      {
        "id":"12",
        "x": 138.5,
        "y": 182.5,
        "name":"杭州师范大学仓前校区体育馆",
        "intro":"亚运会排球、橄榄球项目比赛场馆，位于余杭塘路与良睦路交叉口。场馆建筑面积达5.6万平方米，建成后可同时容纳近8000观众。场内配备电视发送室、新闻中心、竞赛指挥室、组委会会议室等比赛功能用房，还设有一块25米长、9米宽的液晶显示屏，以及满足大型比赛的广播和音响系统、灯光系统等。",
        "sport":"排球",
        "templete_name":"默契对传",
        "templete_intro":"最“默契”的搭档在哪里？两个人一起拿上球练习对传吧！没有球或许也可以尝试凭空比动作哦。",
        "isLit":false,
        "img":"hzsfdxcqxqtyg",
      },
      {
        "id":"1",
        "x": 358,
        "y": 64,
        "name":"浙江大学紫金港校区体育馆",
        "intro":"亚运会篮球项目比赛场馆之一，位于杭州市西湖区。场馆充分遵循杭州亚运会“节俭”办赛的理念，由浙大紫金港校区体育馆和热身馆改造而成。用地面积8863平方米，总建筑面积16594平方米，观众席数4821个。与东侧风雨操场和北侧游泳馆空间高度整合，形成一个综合性体育场区。",
        "sport":"篮球",
        "templete_name":"万物皆可投",
        "templete_intro":"水瓶、衣服……只有想不到没有做不到，比一比谁的投篮更有创意吧。只要动作帅，“万物皆可投”！",
        "isLit":false,
        "img":"zjdxzjgxqtyg",
      },
      {
        "id":"3",
        "x": 335,
        "y": 260,
        "name":"浙江省黄龙体育中心体育馆",
        "intro":"亚运会体操项目比赛场馆，位于杭州市西湖区，地处整个黄龙体育中心的东南侧。用地面积14936平方米，总建筑面积24489平方米，观众席位8000个。是浙江省目前规模最大、功能最全的现代化体育设施，网球中心可开启屋盖，为浙江体育建筑之首例。其主体育场形态独特，已成为浙江省的标志性建筑之一。",
        "sport":"体操",
        "templete_name":"翩翩起舞",
        "templete_intro":"使用丝带、床单、卷纸等任意道具，一起跳舞吧！",
        "isLit":false,
        "img":"zjshltyzxtyg",
      },
      {
        "id":"2",
        "x": 323,
        "y": 495,
        "name":"西湖国际高尔夫球场",
        "intro":"亚运会高尔夫项目比赛场地及训练场地，位于杭州市西湖区之江大道200号，四周青山绿水环绕，与江南风情水乳交融。用地面积70万平方米，总建筑面积1300平方米，总共18洞，黑T总长7039码。由美国高尔夫大师杰克·尼克劳斯设计，是浙江省最早、也是唯一经国务院批准立项建造的高尔夫球场。",
        "sport":"高尔夫",
        "templete_name":"一杆进洞",
        "templete_intro":"在地上围个圈，用任意工具模仿高尔夫击球动作，尽力让球停在圈内吧！",
        "isLit":false,
        "img":"xhgjgefqc",
      },
      {
        "id":"17",
        "x": 53,
        "y": 666,
        "name":"富阳区射击射箭馆",
        "intro":"亚运会射击、射箭、现代五项比赛场馆及训练场馆，位于杭州市富阳区银湖街道，地处亚运村西南侧且相距约40公里。用地面积275182平方米，总建筑面积82360平方米，含射击综合馆、新闻媒体与安保中心、4片室外飞碟靶场、射箭场、现代五项激光跑场地和马术场地等。",
        "sport":"射击",
        "templete_name":"百步穿杨",
        "templete_intro":"即使没有八倍镜，你也可以是“狙神”。做出最帅气的射击动作吧！",
        "isLit":false,
        "img":"fyqsjsjg",
      },
      {
        "id":"16",
        "x": 226,
        "y": 729,
        "name":"富阳区水上运动中心",
        "intro":"亚运会赛艇、皮划艇（含静水、激流回旋）项目比赛场地及训练场地，位于杭州市富阳区北支江南岸，地处亚运村西南侧且相距约26公里。用地面积80757平方米，总建筑面积64013平方米，观众席数4040个，含赛事管理、场馆管理、观众服务、新闻媒体等功能。",
        "sport":"赛艇",
        "templete_name":"亦可赛艇",
        "templete_intro":"找几根“桨”和朋友们一起赛艇吧。动作一定要整齐划一，加上口号更显团队气势！",
        "isLit":true,
        "img":"fyqssydzx",
      },
      {
        "id":"10",
        "x": 498,
        "y": 150,
        "name":"拱墅区运河亚运公园体育馆",
        "intro":"亚运会乒乓球比赛场馆。 建筑面积21477平米，地下一层，地上二层，观众席7500座。外观设计源于玉器“琮”，结合丝绸的光泽平滑，有着结实而轻便的特性。一面覆盖黄铜瓦，另一面为玻璃立面，允许日光进入，完美地将顶级国际设计品质与当地文化遗产相结合。",
        "sport":"乒乓球",
        "templete_name":"乒乒乓乓",
        "templete_intro":"真正的“球神”不受限制，即使没有球拍，书本、锅铲、水瓶也能让你一展风采。尝试用日常工具打球吧！",
        "isLit":false,
        "img":"gsqyhyygytyg",
      },
      {
        "id":"4",
        "x": 459,
        "y": 353,
        "name":"浙江省黄龙体育中心游泳跳水馆",
        "intro":"亚运会水球项目比赛场馆，位于杭州市西湖区风景秀丽的西子湖畔，地处整个黄龙体育中心的北部，在亚运村的西北方向且相距约11.5公里。用地面积15723平方米，总建筑面积48442平方米，观众席位2938个。",
        "sport":"水球",
        "templete_name":"不落水传球",
        "templete_intro":"和搭档尝试陆上“不落水传球（干传）”动作，看看能够坚持多少趟对传。",
        "isLit":false,
        "img":"zjshltyzxyytsg",
      },
      {
        "id":"5",
        "x": 594,
        "y": 237,
        "name":"杭州市体育馆",
        "intro":"亚运会拳击项目比赛场馆，位于杭州市下城区，地处亚运村西北侧且相距6.7公里。用地面积33334平方米，总建筑面积34202平方米，观众席数4209个，包含比赛馆、热身馆及相关赛事功能用房。主体育馆始建于1966年，为文保建筑，独特的马鞍形屋面使得其成为20世纪杭州市标志性体育建筑设施。",
        "sport":"拳击",
        "templete_name":"重拳出击",
        "templete_intro":"展示你出其不意的拳击招数，成为一拳超人！",
        "isLit":false,
        "img":"hzstyg",
      },
      {
        "id":"6",
        "x": 711,
        "y": 318,
        "name":"江干区体育中心体育场",
        "intro":"亚运会足球项目比赛场地，位于杭州市江干区体育中心内，地处亚运村西北方向且相距约9.5公里。用地面积30000平方米，总建筑面积16063平方米，观众席数13544个，含比赛场及相关赛事服务用房。",
        "sport":"足球",
        "templete_name":"创意射门",
        "templete_intro":"用任何工具模仿做出足球射门动作，看看谁的脑洞更有创意。",
        "isLit":false,
        "img":"jgqtyzxtyc",
      },
      {
        "id":"9",
        "x": 777,
        "y": 527,
        "name":"杭州奥体中心游泳馆",
        "intro":"亚运会游泳、跳水、花样游泳项目比赛场馆及训练场馆，位于杭州奥体中心北端。总建筑面积53959平方米，地上两层（局部三层），地下两层，建筑高度35米，观众席位约6000个。场馆设计理念源于“银河幻影”，采用独特的流线造型，结合两翼张开的平台形式，形成“化蝶”的杭州文化主题。",
        "sport":"游泳",
        "templete_name":"标准泳姿",
        "templete_intro":"在床上或者垫子上模仿练习各种泳姿，动作一定要标准哦。",
        "isLit":false,
        "img":"hzatzxyyg",
      },
      {
        "id":"8",
        "x": 862,
        "y": 418,
        "name":"杭州奥体博览城主体育场",
        "intro":"杭州亚运会主体育场及田径项目比赛场地，位于杭州市滨江区、杭州城市新中心。总建筑面积22.9万平方米，地上六层，地下一层，观众席位约80000个。该场馆俗称“大莲花”，由28片大花瓣和27片小花瓣组成，造型取意于杭州丝绸纹理与纺织体系，造型动感飘逸，犹如一朵美丽的莲花绽放于钱塘江畔。",
        "sport":"田径",
        "templete_name":"燃烧卡路里",
        "templete_intro":"最好的风景，在路上。记录下你慢跑时的沿途风景吧！",
        "isLit":false,
        "img":"hzatblcztyc",
      },
      {
        "id":"13",
        "x": 941,
        "y": 654,
        "name":"萧山区体育中心体育馆",
        "intro":"亚运会举重项目比赛场地，位于杭州市萧山区体育中心内。用地面积12353平方米，总建筑面积10802平方米，观众席数1901个，含比赛馆及相关赛事服务用房。馆体呈等边六角形，是一座设计新颖、具有南方特色的多功能体育设施，各类比赛配套用房更具完善、合理，环境宽敞、舒适。",
        "sport":"举重",
        "templete_name":"举重若轻",
        "templete_intro":"用举重的姿势举起一件身边随处可见的“重物”吧。物品越小，反差越大，效果越精彩哦。",
        "isLit":false,
        "img":"xsqtyzxtyg",
      },
      {
        "id":"15",
        "x": 792,
        "y": 733,
        "name":"萧山区临浦体育馆",
        "intro":"亚运会柔道、柔术、克柔术项目比赛场馆及训练场馆，位于杭州市萧山区临浦镇核心位置。长方形场馆与椭圆形广场相辉映，用地面积26599平方米，总建筑面积24040平方米，观众席数2600个。幕墙材料为临浦当地文化特色的大理石，入口处采用中式斗拱构架设计，富有古典韵味和文化气息。",
        "sport":"柔术",
        "templete_name":"飞檐走壁",
        "templete_intro":"挑战柔术基本功之一“墙上行走”，看看你能走多远！",
        "isLit":false,
        "img":"xsqlftyg",
      },
      {
        "id":"14",
        "x": 1073,
        "y": 475,
        "name":"萧山区瓜沥文体中心体育馆",
        "intro":"亚运会卡巴迪、武术项目比赛场馆及训练场馆，位于杭州市萧山区瓜沥镇新区核心地点，在亚运村以东方向且相距约21公里。用地面积36000平方米，总建筑面积33045平方米，观众席数4251个，含主比赛馆及热身馆。",
        "sport":"武术",
        "templete_name":"武动乾坤",
        "templete_intro":"长拳、南拳和太极，无论是哪一种拳派，动作潇洒，就是“拳皇”！",
        "isLit":false,
        "img":"xsqglwtzxtyg",
      },
      {
        "id":"11",
        "x": 938,
        "y": 33,
        "name":"余杭区体育中心体育馆",
        "intro":"亚运会空手道项目比赛场馆，地处余杭区南苑街道东湖南路177号。造型别致，环境优美，内设篮球、羽毛球、乒乓球等多个运动项目及配套设施，观众座位3340座。大厅采用中央空调系统，集采暖、制冷于一体。本馆既能承办全国性的单项体育竞赛，举行大型综合性活动，也是广大人民群众健身娱乐的理想场所。",
        "sport":"空手道",
        "templete_name":"空手劈“砖”",
        "templete_intro":"尝试空手道手刀动作。不管是瓦片木片还是纸片，都能一手劈开！",
        "isLit":false,
        "img":"yhqtyzxtyg",
      },
      {
        "id":"7",
        "x": 1125,
        "y": 116,
        "name":"杭州电子科技大学体育馆",
        "intro":"亚运会击剑项目比赛场馆，位于杭州市江干区下校高教园内的杭州电子科技大学，因外型酷似“UFO”被师生们称为“飞碟”体育馆。拥有5条击剑道，5000多个观众座位。为充分将校园文化与亚运文化相结合，专门设计了一条绕场一周的“亚运阳光跑道”，让学生更多地了解和体验亚运。",
        "sport":"击剑",
        "templete_name":"斩木为兵",
        "templete_intro":"伞、棍子等任意工具都可以是你的剑。心中无杂念，拔剑自然神！",
        "isLit":false,
        "img":"hzdzkjdxtyg",
      },
    ]
  },
  onModalClose() {
    console.log("close")
    this.setData({
      show: false,
    });
  },
  onLoad (query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.getToken()
    this.fetchMuseumsAndLitDetail()
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
  async fetchMuseumsAndLitDetail() {
    const res = await venueModel.getLitDetail()
    var old_museums = this.data.museums
    for (let idx = 0; idx < res.length; idx++) {
      let museum = res[idx]
      for (let index = 0; index < old_museums.length; index++) {
        if (old_museums[index].id == museum["id"]) {
          old_museums.isLit = museum["isLit"]
        }
      }
    }
    this.setData({
      museums : old_museums
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
  jumpToMyPage () {
    console.log("navigate");
    my.navigateTo({
      url: '../MinePage/MinePage'
    });
  },
  museumButtonTapped (e) {
    console.log(e.currentTarget.id)
    this.showCard(e.currentTarget.id)
  },
  videoPlaygroundTapped (e) {
    console.log(e);
    my.navigateTo({
      url: 'video'
    });
  },
  myTapped (e) {
    console.log(e);
  },
  routeTapped (e) {
    console.log(e.currentTarget.id);
    var tap_id = e.currentTarget.id;
    if (tap_id == 1) {
      this.setData({
        water_bgc:"#F850B0",
        ball_bgc:"#FF9088",
        com_bgc:"#FF9088",
        rivalry_bgc:"#FF9088",
        water_visible:true,
        ball_visible:false,
        com_visible:false,
        rivalry_visible:false,
      })
    } else if (tap_id == 2) {
      this.setData({
        ball_bgc:"#F850B0",
        water_bgc:"#FF9088",
        com_bgc:"#FF9088",
        rivalry_bgc:"#FF9088",
        water_visible:false,
        ball_visible:true,
        com_visible:false,
        rivalry_visible:false,
      })
    } else if (tap_id == 3) {
      this.setData({
        com_bgc:"#F850B0",
        water_bgc:"#FF9088",
        ball_bgc:"#FF9088",
        rivalry_bgc:"#FF9088",
        water_visible:false,
        ball_visible:false,
        com_visible:true,
        rivalry_visible:false,
      })
    } else if (tap_id == 4) {
      this.setData({
        rivalry_bgc:"#F850B0",
        water_bgc:"#FF9088",
        ball_bgc:"#FF9088",
        com_bgc:"#FF9088",
        water_visible:false,
        ball_visible:false,
        com_visible:false,
        rivalry_visible:true,
      })
    }
  }
});


