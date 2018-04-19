/**
 * Created by gd on 2018/1/4/004.
 * 分类管理
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
class cate {
  constructor() {
    this.addUrl = `${urlPre}system/account/add`
    this.getListUrl = `${urlPre}system/account/getList`
    this.updateStatusUrl = `${urlPre}system/account/updateStatus`
    this.deleteByIdUrl = `${urlPre}system/account/deleteById`
    this.updatePasswordUrl = `${urlPre}system/account/updatePassword`
  }

  async updatePassword(params) {
    let data = await httpService.post(this.updatePasswordUrl, params)
    return data
  }

  async deleteById(params) {
    let data = await httpService.post(this.deleteByIdUrl, params)
    return data
  }

  async add(params) {
    let data = await httpService.post(this.addUrl, params)
    return data
  }

  async getList(params) {
    let data = await httpService.post(this.getListUrl, params)
    return data
  }

  async updateStatus(params) {
    let data = await httpService.post(this.updateStatusUrl, params)
    return data
  }
}

export default new cate()
