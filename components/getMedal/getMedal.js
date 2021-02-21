Component({
  mixins: [],
  data: {},
  props: {
    medalName: "",
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    btnBack(e){
      my.navigateBack();
    },
    btnShare(e){
      console.log("Tap to share!");
    }
  },
});
