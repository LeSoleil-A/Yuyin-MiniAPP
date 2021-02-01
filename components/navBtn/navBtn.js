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
      console.log("Click on " + this.props.navTo);
    },
  },
});
