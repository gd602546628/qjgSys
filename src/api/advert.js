/**
 * Created by gd on 2018/4/9/009.
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'

class advert {
  constructor() {
    this.publishUrl = `${urlPre}public/advert/publish`
    this.updateUrl = `${urlPre}public/advert/update`
    this.addUrl = `${urlPre}public/advert/add`
    this.getListUrl = `${urlPre}public/advert/getList`
    this.getByIdUrl = `${urlPre}public/advert/getById`
    this.updateUrl = `${urlPre}public/advert/update`
    this.deleteByIdUrl = `${urlPre}public/advert/deleteById`
  }

  async publish(params = {}) {
    let data = await httpService.post(this.publishUrl, params)
    return data
  }

  async update(params = {}) {
    let data = await httpService.post(this.updateUrl, params)
    return data
  }

  async add(params = {}) {
    let data = await httpService.post(this.addUrl, params)
    return data
  }

  async getList(params = {}) {
    let data = await httpService.post(this.getListUrl, params)
    return data
  }

  async getById(params = {}) {
    let data = await httpService.post(this.getByIdUrl, params)
    return data
  }

  async update(params = {}) {
    let data = await httpService.post(this.updateUrl, params)
    return data
  }

  async deleteById(params = {}) {
    let data = await httpService.post(this.deleteByIdUrl, params)
    return data
  }
}
export default new advert()
