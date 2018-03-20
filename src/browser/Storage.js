import { isArray, isObject } from '../common/Type.js'

class Storage {
  constructor (config) {
    this.config = {
      driver: '',
      path: '',
      domain: '',
      secure: '',
      max: 0
    }
    Object.assign(this.config, config)
  }
  get db () {
    let db = null
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        db = window.localStorage
        break;
      case Storage.SESSIONSTORAGE:
        db = window.sessionStorage || ( window.UserDataStorage && new UserDataStorage() )|| new cookieStorage()
        break;
      case Storage.COOKIE:
        db = document.cookie || window.cookie
        break;
      default:
        // statements_def
        break;
    }
    return db
  }
  set db (v) {
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        break;
      case Storage.SESSIONSTORAGE:
        break;
      case Storage.COOKIE:
        (document.cookie && (document.cookie = v)) || (window.cookie && (window.cookie = v))
        break;
      default:
        // statements_def
        break;
    }
  }
  /**
   * [setItem 设置值]
   * @param {String} k      [键]
   * @param {*} v      [值]
   * @param {Object} config [{end: 结束时间,domain: 域名,path: 路径: secure: 安全}]
   */
  setItem (k, v, config) {
    if (!k) return
    if (this.config.driver === Storage.COOKIE) {
      if (/^(?:expires|max\-age|path|domain|secure)$/i.test(k)) return
      domain = config.domain || this.config.domain
      path = config.path || this.config.path
      secure = config.secure || this.config.secure
      let expires = ''
      if (config.end) {
        switch (config.end.constructor) {
          case Number:
            expires = config.end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + end;
            break;
          case String:
            expires = "; expires=" + config.end;
            break;
          case Date:
            expires = "; expires=" + config.end.toUTCString();
            break;
        }
      }
      this.db = encodeURIComponent(k) + '=' + encodeURIComponent(v) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '')
    } else {
      if (isArray(v) || isObject(v)) {
        this.db.setItem(k, JSON.stringify(v))
      } else {
        this.db.setItem(k, v)
      }
    }
  }
  hasItem (k) {
    return !!this.getItem(k)
  }
  getItem (k) {
    let value = null
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        value = JSON.parse(this.db.getItem(k))
        break;
      case Storage.SESSIONSTORAGE:
        value = JSON.parse(this.db.getItem(k))
        break;
      case Storage.COOKIE:
        value = decodeURIComponent(this.db.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(k).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
        break;
      default:
        break;
    }
    return value
  }
  removeItem (k, config) {
    if (!k || !this.hasItem(k)) return
    domain = config.domain || this.config.domain
    path = config.path || this.config.path
    if (this.config.driver === Storage.COOKIE) {
      this.db = encodeURIComponent(k) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? '; domain=' + domain : '') + ( path ? '; path=' + path : '')
    } else {
      this.db.removeItem(k)
    }
  }
  keys () {
    let keys = []
    if (this.config.driver === Storage.COOKIE) {
      let keyArr = getCookieKeys(this.db)
      for (let i = 0; i < keyArr.length; i++) {
        keys[i] = decodeURIComponent(keyArr[i])
      }
    } else {
      for (let i = 0; i < this.db.length; i++) {
        keys[i] = this.db.key(i)
      }
    }
    return keys
  }
  key (i) {
    let key = null
    if (this.config.driver === Storage.COOKIE) {
      let keyArr = getCookieKeys(this.db)
      for (let j = 0; j < keyArr.length; j++) {
        if (i === j) {
          key = decodeURIComponent(keyArr[i])
          break
        }
      }
    } else {
      key = this.db.key(i)
    }
    return key
  }
  clear () {
    if (this.config.driver === Storage.COOKIE) {
      let keyArr = getCookieKeys(this.db)
      for (let j = 0; j < keyArr.length; j++) {
        this.removeItem(keyArr[j])
      }
    } else {
      this.db.clear()
    }
  }
}
Storage.LOCALSTORAGE = 'localStorage'
Storage.SESSIONSTORAGE = 'sessionStorage'
Storage.COOKIE = 'cookie'

function getCookieKeys (c) {
  return c.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
}

window && (window.DStorage = Storage)

export default Storage