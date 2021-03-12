Component({
  mixins: [],
  data: {},
  props: {
    medalName: "",
    modalImgSrc:"",
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
    },
    _onModalClose: function _onModalClose() {
      var onModalClose = this.props.onModalClose;

      if (onModalClose) {
        onModalClose();
      }
    },
  },
});
