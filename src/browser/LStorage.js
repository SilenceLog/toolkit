import { isArray, isObject } from '../common/Type.js'

class Storage {
  constructor (config) {
    this.config = {
      driver: '',
      path: '',
      domain: '',
      secure: ''
    }
    Object.assign(this.config, config)
  }
  get db () {
    let db = null
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        db = window.localStorage
        break
      case Storage.SESSIONSTORAGE:
        db = window.sessionStorage || (window.UserDataStorage && new UserDataStorage()) || new cookieStorage()
        break
      case Storage.COOKIE:
        db = window.document.cookie || window.cookie
        break
      case Storage.WXSTORAGE:
        db = wx || {}
        break
      default:
        // statements_def
        break
    }
    return db
  }
  set db (v) {
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        break
      case Storage.SESSIONSTORAGE:
        break
      case Storage.COOKIE:
        (window.document.cookie && (window.document.cookie = v)) || (window.cookie && (window.cookie = v))
        break
      case Storage.WXSTORAGE:
        break
      default:
        // statements_def
        break
    }
  }
  /**
   * [setItem 设置值]
   * @param {String} k [键]
   * @param {*} v      [值]
   * @param {Object} config [{end: 结束时间,domain: 域名,path: 路径: secure: 安全}]
   */
  setItem (k, v, config) {
    if (!k) return
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        try {
          if (isArray(v) || isObject(v)) {
            this.db.setItem(k, JSON.stringify(v))
          } else {
            this.db.setItem(k, v)
          }
        } catch(e) {
          switch (e.name) {
            case 'QuotaExceededError':
              console.log('内存溢出')
              break
            default:
              break
          }
        }
        break
      case Storage.SESSIONSTORAGE:
        try {
          if (isArray(v) || isObject(v)) {
            this.db.setItem(k, JSON.stringify(v))
          } else {
            this.db.setItem(k, v)
          }
        } catch(e) {
          switch (e.name) {
            case 'QuotaExceededError':
              console.log('内存溢出')
              break
            default:
              break
          }
        }
        break
      case Storage.COOKIE:
        if (/^(?:expires|max\-age|path|domain|secure)$/i.test(k)) return
        domain = config.domain || this.config.domain
        path = config.path || this.config.path
        secure = config.secure || this.config.secure
        let expires = ''
        if (config.end) {
          switch (config.end.constructor) {
            case Number:
              expires = config.end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end
              break
            case String:
              expires = '; expires=' + config.end
              break
            case Date:
              expires = '; expires=' + config.end.toUTCString()
              break
          }
        }
        this.db = encodeURIComponent(k) + '=' + encodeURIComponent(v) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '')
        break
      case Storage.WXSTORAGE:
        value = this.db.setStorageSync(k, v)
        break
      default:
        break
    }
    setStorageSync
  }
  hasItem (k) {
    return !!this.getItem(k)
  }
  getItem (k) {
    let value = null
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        value = JSON.parse(this.db.getItem(k))
        break
      case Storage.SESSIONSTORAGE:
        value = JSON.parse(this.db.getItem(k))
        break
      case Storage.COOKIE:
        value = decodeURIComponent(this.db.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(k).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
        break
      case Storage.WXSTORAGE:
        value = this.db.getStorageSync(k)
        break
      default:
        break
    }
    return value
  }
  removeItem (k, config={}) {
    if (!k || !this.hasItem(k)) return
    domain = config.domain || this.config.domain
    path = config.path || this.config.path
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        this.db.removeItem(k)
        break
      case Storage.SESSIONSTORAGE:
        this.db.removeItem(k)
        break
      case Storage.COOKIE:
        this.db = encodeURIComponent(k) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '')
        break
      case Storage.WXSTORAGE:
        this.db.removeStorageSync(k)
        break
      default:
        break
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
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        this.db.clear()
        break
      case Storage.SESSIONSTORAGE:
        this.db.clear()
        break
      case Storage.COOKIE:
        let keyArr = getCookieKeys(this.db)
        for (let j = 0; j < keyArr.length; j++) {
          this.removeItem(keyArr[j])
        }
        break
      case Storage.WXSTORAGE:
        this.db.clearStorageSync(k)
        break
      default:
        break
    }
  },
  getUsedSpace () {
  }
  getLimitSpace () {
    let limit = -1
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        limit = 5 * 1024 * 1024
        break
      case Storage.SESSIONSTORAGE:
        limit = 5 * 1024 * 1024
        break
      case Storage.COOKIE:
        limit = 4 * 1024
        break
      case Storage.WXSTORAGE:
        limit = 10 * 1024 * 1024
        break
      default:
        break
    }
    return limit
  }
}
Storage.LOCALSTORAGE = 'localStorage'
Storage.SESSIONSTORAGE = 'sessionStorage'
Storage.COOKIE = 'cookie'
Storage.WXSTORAGE = 'wxStorage'

// 获取浏览器存储上限
function getBrowserStorageSpace () {
}

// 微信存储信息获取
function wxGetStorageInfoSync () {
  // return a=a
}

function getCookieKeys (c) {
  return c.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
}

window && (window.LStorage = Storage)

export default Storage
