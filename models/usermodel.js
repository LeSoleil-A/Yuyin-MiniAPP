import { HTTP } from "../util/http"

class UserModel extends HTTP {
  async getToken(code) {
    return await this.request({
      url: 'v1/token', 
      data: {
        "account": code,
        "type":100
      },
      method:'post'
    })
  }

   async testToken(code) {
    return await this.request({
      url: 'v1/user/get', 
      data: {
      },
      method:'get'
    })
  }

  async verifyToken(token){
     return await this.request({
      url: 'v1/token/verify', 
      data: {
        token
      },
      method:'post'
    })
  }

  async getLitVenue(){
     return await this.request({
      url: 'v1/venue/litinfo', 
      data: {
      },
      method:'get'
    })
  }

  async getLitMedal(){
     return await this.request({
      url: 'v1/medal/get', 
      data: {
      },
      method:'get'
    })
  }
}



export { UserModel }