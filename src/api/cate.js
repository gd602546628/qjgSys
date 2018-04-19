/**
 * Created by gd on 2018/1/4/004.
 * 分类管理
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
class cate {
  constructor() {
    this.getListUrl = `${urlPre}public/cate/getList`
    this.addUrl = `${urlPre}public/cate/add`
    this.deleteByIdUrl = `${urlPre}public/cate/deleteById`
    this.updateUrl = `${urlPre}public/cate/update`
  }

  async getList(params = {}) {
    let data = await httpService.post(this.getListUrl, params)
    return data
  }

  async add(params = {}) {
    let data = await httpService.post(this.addUrl, params)
    return data
  }

  async deleteById(params = {}) {
    let data = await httpService.post(this.deleteByIdUrl, params)
    return data
  }

  async update(params = {}) {
    let data = await httpService.post(this.updateUrl, params)
    return data
  }
}

export default new cate()
