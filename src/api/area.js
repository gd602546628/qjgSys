/**
 * Created by gd on 2018/4/9/009.
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'

class advert {
  constructor() {
    this.getListUrl = `${urlPre}public/area/getList`
    this.deleteByIdUrl = `${urlPre}public/area/deleteById`
    this.addUrl = `${urlPre}public/area/add`
  }

  async getList(params = {}) {
    let data = await httpService.post(this.getListUrl, params)
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
