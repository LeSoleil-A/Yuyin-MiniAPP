import { HTTP } from "../util/http"

class MedalModel extends HTTP {
  async getMedalDetail(medalId) {
    return await this.request({
      url: 'v1/medal/detail', 
      data: {
        "medal_id": medalId
      },
      method:'get'
    })
  }

  async getMedalLit() {
    return await this.request({
      url: 'v1/medal/get', 
      data: {
      },
      method:'get'
    })
  }
}



export { MedalModel }