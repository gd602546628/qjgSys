/**
 * Created by gd on 2017/12/29/029.
 */
import {config} from '@/config/config'
import login from './login' // 登录
import cate from './cate' // 分类
import advert from './advert'
import icon from './icon'
import systemRole from './systemRole'
import systemUser from './systemUser'
import area from './area'
import systemAccount from './systemAccount'
let Api = {
  login,
  cate,
  advert,
  icon,
  systemUser,
  systemRole,
  area,
  systemAccount
}
export default Api
