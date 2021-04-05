import { HTTP } from "../util/http"
class VideoModel extends HTTP {

  getInfo(id) {
    //imageKey为上传后在Oss的路径地址
    console.log("getInfo Exceed",id)
    //先拿到后端给予的签名数据与policy数据，才能上传文件至OSS
    return this.request({
      url: "v1/video/getInfo",
      data: {
        video_id:id
      },
      method: 'get'
    })
  }


}

export { VideoModel }