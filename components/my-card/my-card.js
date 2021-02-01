Component({
  mixins: [],
  data: {},
  props: {
    name: "",
    ImageSrc: "",
    Detail: "杭州体育馆的前身是浙江省人民体育馆，位于杭州市体育场路210号。它建于1966年，是二十世纪60年代杭州市标志性体育建筑设施。该馆于2001年1月交由杭州市体育局管理并命名为杭州体育馆，市政府投资两仟多万元改造后的杭州体育馆雄伟、壮观、新颖、大方，极具时代气息，它既保留了国内仅存的原有“船体”造型，内外装修风格又与现代都市风貌相呼应。",
    itemIcon: "/pages/index/image/Rectangle.png",
    itemName: "田径"
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    btnTap(e){
      my.navigateTo({
        url: '../TeachingPage/TeachingPage'
      });      
    },
  },
});
