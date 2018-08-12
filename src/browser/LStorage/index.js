import { isArray, isObject } from '../../common/Type.js'

import LocalStorage from './LocalStorage'
import SessionStorage from './SessionStorage'
import Cookie from './Cookie'
import WxStorage from './WxStorage'

class Storage {
  constructor (config) {
    this.config = {
      driver: ''
    }
    Object.assign(this.config, config)
  }
}
Storage.LOCALSTORAGE = 'localStorage'
Storage.SESSIONSTORAGE = 'sessionStorage'
Storage.COOKIE = 'cookie'
Storage.WXSTORAGE = 'wxStorage'

/**
 * [extendDB 数据库挂载]
 * @param  {String} name [description]
 * @param  {Object} obj  [description]
 * @return {Null}      [description]
 */
Storage.prototype.extendDB = function (name, obj) {
  Storage[name.toString().toUpperCase()] = name
}

Storage.extendDB(Storage.LOCALSTORAGE, LocalStorage)
Storage.extendDB(Storage.SESSIONSTORAGE, SessionStorage)
Storage.extendDB(Storage.COOKIE, Cookie)
Storage.extendDB(Storage.WXSTORAGE, WxStorage)