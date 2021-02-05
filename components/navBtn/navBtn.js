Component({
  mixins: [],
  data: {},
  props: {
    imgSrc: "",
    text: "",
    navTo: "",
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleTap(e){
      console.log(this.props.navTo);
      my.navigateTo({
        url: this.props.navTo
      });;
    },
  },
});
