const cv = require("../../../util/opencv/opencv_js")

Page({
  data: {},
  onLoad() {

  },
  drawImage(){
    console.log("ss")
    const ctx = my.createCanvasContext('canvas');
    ctx.drawImage("/pages/canvas/canvas/stadium.png",0,0,300,300)
    ctx.draw()
    console.log("a")

    let camera = my.createSelectorQuery().select('#videoInput')
    let cap = new cv.VideoCapture(camera)
    console.log("cameara",camera)
  }

});
