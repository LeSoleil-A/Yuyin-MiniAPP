import { config } from '../config.js'
import {
  Base64
} from './base64.js'

//tips 为出错提示码

const tips = {
  1: '抱歉，出现了一个错误',
  10004: '授权失败'
}

// # 解构
class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    console.log("A Request has Been Sent To:", config.api_base_url + url, "\nmethod:", method, "\ndata:", data)
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET', dataType = 'json') {
    //dataType为期望返回的数据格式，默认json，支持json，text，base64
    my.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      dataType: dataType,
      headers: {
        'content-type': 'application/json',
        'Authorization': this._encode()
      },
      success: (res) => {
        const code = res.status.toString()
        if (code.startsWith('2')) {
          console.log("Request Success")
          console.log("Res.data", res.data)
          resolve(res.data)
        }
        else {
          console.log("Request Failed")
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        console.log("Request Failed", err)
        reject(err.data)
        this._show_error(10004)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    console.log(tip ? tip : tips[1])
  }

  _encode() {
    const token = my.getStorageSync({ key: 'token' }).data
    console.log(token)
    const base64 = new Base64()
    const result = base64.encode(token + ':')
    return 'Basic ' + result
  }
}

export { HTTP }