import { isArray, isObject } from './Type.js'

class Storage {
  constructor (config) {
    this.db = null
    this.config = {
      driver: '',
      max: 0
    }
    Object.assign(this.config, config)
    switch (this.config.driver) {
      case Storage.LOCALSTORAGE:
        this.db = window.localStorage
        break;
      case Storage.COOKIE:
        this.db = window.sessionStorage || ( window.UserDataStorage && new UserDataStorage() )|| new cookieStorage()
        break;
      case Storage.SESSIONSTORAGE:
        this.db = window.cookie
        break;
      default:
        // statements_def
        break;
    }
  }
  setItem (k, v) {
    if (isArray(v) || isObject(v)) {
      this.db.setItem(k, JSON.stringify(v))
    } else {
      this.db.setItem(k, v)
    }
  }
  getItem (k) {
    return JSON.parse(this.db.getItem(k))
  }
  removeItem (k) {
    this.db.removeItem('key')
  }
  key (i) {
    return this.db.key(i)
  }
  clear () {
    this.db.clear()
  }
}
Storage.LOCALSTORAGE = 'localStorage'
Storage.SESSIONSTORAGE = 'sessionStorage'
Storage.COOKIE = 'cookie'

export default Storage