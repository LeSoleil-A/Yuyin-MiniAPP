Component({
  mixins: [],
  data: {},
  props: {
    venueId: "",
    name: "",
    imageSrc: "",
    detail: "亚运会篮球项目比赛场馆之一，位于杭州市西湖区。场馆充分遵循杭州亚运会“节俭”办赛的理念，由浙大紫金港校区体育馆和热身馆改造而成。用地面积8863平方米，总建筑面积16594平方米，观众席数4821个。与东侧风雨操场和北侧游泳馆空间高度整合，形成一个综合性体育场区。",
    itemIcon: "/pages/index/image/Rectangle.png",
    itemName: "田径",
    isLit: false,
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    btnTap(e){
      my.navigateTo({
        url: '../../pages/VenueDetail/VenueDetail?venueId='+this.props.venueId
      });      
    },
  },
});
