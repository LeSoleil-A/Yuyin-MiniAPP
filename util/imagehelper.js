// 此文件为此小程序端上传至云端的依赖项，封装了图片上传、获取某一图片网址等操作
import { config } from '../config.js'
import { HTTP } from "./http"
class FileHelper {

  static async uploadImage(imagePath, imageKey) {
    //imageKey为上传后在Oss的路径地址
    console.log("A Picture has Been Upload To Ali-Oss:")
    const http = new HTTP()
    //先拿到后端给予的签名数据与policy数据，才能上传文件至OSS
    const params = await http.request({
      url: "v1/oss/upload_signature",
      data: {
      },
      method: 'get'
    })
    const policy = params.policy
    const signature = params.signature
    return new Promise((resolve, reject) => {
      FileHelper._uploadImage(resolve, reject, imagePath, imageKey, policy, signature)
    })
  }

 static _uploadImage(resolve, reject, imagePath, imageKey, policy, signature) {
    my.uploadFile({
      url: config.ali_oss.host,
      fileType: 'image',
      fileName: imageKey,
      filePath: imagePath,
      formData: {
        key: imageKey,
        policy,
        OSSAccessKeyId: config.ali_oss.ossAccessKeyId,
        signature,
        success_action_status: '200',
      },
      success: (res) => {
        // 默认上传成功状态码为204，此处被success_action_status设置为200。
        console.log("uploadImage Success", res)
        resolve(res)
      },
      fail: err => {
        console.log("uploadImage Failed", err)
        reject(err);
      }
    });
  }

  static async uploadVideo(videoPath, videoKey) {
    //imageKey为上传后在Oss的路径地址
    console.log("A Video has Been Upload To Ali-Oss:")
    const http = new HTTP()
    //先拿到后端给予的签名数据与policy数据，才能上传文件至OSS
    const params = await http.request({
      url: "v1/oss/upload_signature",
      data: {
      },
      method: 'get'
    })
    const policy = params.policy
    const signature = params.signature
    return new Promise((resolve, reject) => {
      FileHelper._uploadVideo(resolve, reject, imagePath, imageKey, policy, signature)
    })
  }

  static _uploadVideo(resolve, reject, videoPath, videoKey, policy, signature) {
    my.uploadFile({
      url: config.ali_oss.host,
      fileType: 'video',
      fileName: videoKey,
      filePath: videoPath,
      formData: {
        key: videoKey,
        policy,
        OSSAccessKeyId: config.ali_oss.ossAccessKeyId,
        signature,
        success_action_status: '200',
      },
      success: (res) => {
        // 默认上传成功状态码为204，此处被success_action_status设置为200。
        console.log("uploadVideo Success", res)
        resolve(res)
      },
      fail: err => {
        console.log("uploadVideo Failed", err)
        reject(err);
      }
    });
  }

  static async uploadAudio(audioPath, audioKey) {
    //imageKey为上传后在Oss的路径地址
    console.log("An Audio has Been Upload To Ali-Oss:")
    const http = new HTTP()
    //先拿到后端给予的签名数据与policy数据，才能上传文件至OSS
    const params = await http.request({
      url: "v1/oss/upload_signature",
      data: {
      },
      method: 'get'
    })
    const policy = params.policy
    const signature = params.signature
    return new Promise((resolve, reject) => {
      FileHelper._uploadAudio(resolve, reject, audioPath, audioKey, policy, signature)
    })
  }

  static _uploadAudio(resolve, reject, audioPath, audioKey, policy, signature) {
    my.uploadFile({
      url: config.ali_oss.host,
      fileType: 'audio',
      fileName: audioKey,
      filePath: audioPath,
      formData: {
        key: audioKey,
        policy,
        OSSAccessKeyId: config.ali_oss.ossAccessKeyId,
        signature,
        success_action_status: '200',
      },
      success: (res) => {
        // 默认上传成功状态码为204，此处被success_action_status设置为200。
        console.log("uploadAudio Success", res)
        resolve(res)
      },
      fail: err => {
        console.log("uploadAudio Failed", err)
        reject(err);
      }
    });
  }

}

export { FileHelper }