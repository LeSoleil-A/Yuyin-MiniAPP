App({
  globalData: {
     medalTotal: [{
      medalId: 1,
      medalWallName: "小试牛刀",
      medalCondition: "闪闪发亮的奖牌，在我的亚运之旅中累计点亮3个场馆",
      venueList: []
    },{
      medalId: 2,
      medalWallName: "势如破竹",
      medalCondition: "闪闪发亮的铜牌，在我的亚运之旅中累计点亮6个场馆",
      venueList: []
    },{
      medalId: 3,
      medalWallName: "大放异彩",
      medalCondition: "闪闪发亮的银牌，在我的亚运之旅中累计点亮12个场馆",
      venueList: []
    },{
      medalId: 4,
      medalWallName: "星光璀璨",
      medalCondition: "闪闪发亮的金牌，在我的亚运之旅中累计点亮18个场馆",
      venueList: []
    },{
      medalId: 5,
      medalWallName: "精益求精",
      medalCondition: "重复打卡任意场馆3次——生命在于运动",
      venueList: []
    },{
      medalId: 6,
      medalWallName: "坚持不懈",
      medalCondition: "重复打卡任意场馆5次——每一次的重复都是为了更高的标准",
      venueList: []
    },{
      medalId: 7,
      medalWallName: "锲而不舍",
      medalCondition: "重复打卡任意场馆10次——绳锯木断，水滴石穿",
      venueList: []
    },{
      medalId: 8,
      medalWallName: "运动新手",
      medalCondition: "连续打卡1天——初来乍到，多多指教",
      venueList: []
    },{
      medalId: 9,
      medalWallName: "运动达人",
      medalCondition: "连续打卡3天——生命不息，运动不止",
      venueList: []
    },{
      medalId: 10,
      medalWallName: "运动教练",
      medalCondition: "连续打卡7天——利剑出鞘，所向披靡",
      venueList: []
    },{
      medalId: 11,
      medalWallName: "运动明星",
      medalCondition: "连续打卡21天——赛场内外，星光闪耀",
      venueList: []
    },{
      medalId: 12,
      medalWallName: "运动冠军",
      medalCondition: "连续打卡100天——竞技场上，唯我独尊",
      venueList: []
    },{
      medalId: 13,
      medalWallName: "体育满绩",
      medalCondition: "点亮所有大学运动场馆",
      venueList: [1, 7, 12]
    },{
      medalId: 14,
      medalWallName: "西子湖畔",
      medalCondition: "点亮所有西湖区运动场馆",
      venueList: [1, 2, 3, 4]
    },{
      medalId: 15,
      medalWallName: "皋亭山顶",
      medalCondition: "点亮所有江干区运动场馆",
      venueList: [6, 7]
    },{
      medalId: 16,
      medalWallName: "白马湖心",
      medalCondition: "点亮所有滨江区运动场馆",
      venueList: [8, 9]
    },{
      medalId: 17,
      medalWallName: "良渚古城",
      medalCondition: "点亮所有余杭区运动场馆",
      venueList: [11, 12]
    },{
      medalId: 18,
      medalWallName: "钱江潮涌",
      medalCondition: "点亮所有萧山区运动场馆",
      venueList: [13, 14, 15]
    },{
      medalId: 19,
      medalWallName: "富春桃源",
      medalCondition: "点亮所有富阳区运动场馆",
      venueList: [16, 17]
    },{
      medalId: 20,
      medalWallName: "杭州印象",
      medalCondition: "点亮所有杭州运动场馆",
      venueList: []
    },{
      medalId: 21,
      medalWallName: "球球作战",
      medalCondition: "点亮所有球类运动场馆",
      venueList: [1, 2, 6, 10, 12]
    },{
      medalId: 22,
      medalWallName: "激流勇将",
      medalCondition: "点亮所有水上运动场馆",
      venueList: [4, 9, 6]
    },{
      medalId: 23,
      medalWallName: "制霸赛场",
      medalCondition: "点亮所有竞技性运动场馆",
      venueList: [3, 8, 13, 14, 17]
    },{
      medalId: 24,
      medalWallName: "不服solo",
      medalCondition: "点亮所有对抗性运动场馆",
      venueList: [5, 7, 11, 15, 18]
    }],
  },
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
