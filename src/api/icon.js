/**
 * Created by gd on 2018/4/9/009.
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'

class advert {
  constructor() {
    this.getAllUrl = `${urlPre}public/icon/getAll`
    this.deleteByIdUrl = `${urlPre}public/icon/deleteById`
    this.addUrl = `${urlPre}public/icon/add`
  }

  async getAll(params = {}) {
    let data = await httpService.post(this.getAllUrl, params)
    return data
  }

  async deleteById(params = {}) {
    let data = await httpService.post(this.deleteByIdUrl, params)
    return data
  }

  async add(params = {}) {
    let data = await httpService.post(this.addUrl, params)
    return data
  }
}
export default new advert()
