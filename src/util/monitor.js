class Monitor {
  constructor () {
    this.config = {
      url: '',
      whiteList: []
    }
    this.info = {
      performance: performance,
      navigator: navigator
    } 
    // 登录信息
    this.loginInfo = {
      // 打开时间
      openTime: null,
      // 白屏结束时间
      whiteScreenTime: null,
      // 可以开始操作时间
      readyTime: null,
      readyFun () {
        this.loginInfo.readyTime = +new Date()
        document.removeEventListener('DOMContentLoaded', this.loginInfo.readyFun)
      },
      // onload时间
      allloadTime: null,
      time: null
    }
  }
  init () {
    let self = this
    self.initLogin()
    self.initError()
    self.initHttp()
  }
  initLogin () {
    let self = this
    self.loginInfo.openTime = self.info.performance.timing.navigationStart
    self.loginInfo.whiteScreenTime = +new Date()
    document.addEventListener('DOMContentLoaded', self.loginInfo.readyFun.call(self))
    window.onload = function () {
      self.loginInfo.allloadTime = +new Date()
      self.loginInfo.time = new Date().getTime()
    }
  }
  initError () {
    let self = this
    window.onerror = function (msg, url, line, col, error) {
        col = col || (window.event && window.event.errorCharacter) || 0;
        let monitorError = new MonitorError({
          url,
          col,
          line,
          time: new Date().getTime()
        })
        if (error && error.stack){
            // 如果浏览器有堆栈信息，直接使用
            monitorError.msg = error.stack.toString();
        } else if (arguments.callee) {
            let ext = []
            let fn = arguments.callee.caller;
            let floor = 3
            while (fn && (--floor>0)) {
                ext.push(fn.toString());
                if (fn  === fn.caller) {
                    break;
                }
                fn = fn.caller
            }
            ext = ext.join(',')
            monitorError.msg = error.stack.toString();
        }
        console.log('MonitorError', monitorError)
        // (new Image()).src = '/error?' + srt;
    }
  }
  initHttp () {
    const self = this
    const open = XMLHttpRequest.prototype.open
    const send = XMLHttpRequest.prototype.send
    let xhr1 = null
    let xhr2 = null
    let xhrList = []
    XMLHttpRequest.prototype.open = function (method, url, bool) {
      xhrList.push(new MonitorXhr({
        method,
        url,
        bool,
        xhr: this
      }))
      open.call(this, method, url, bool)
    }
    XMLHttpRequest.prototype.send = function (_data) {
      this.addEventListener('readystatechange', () => {
        let xhr = this
        if (this.readyState === 4) {
          // && this.ajaxUrl !== self.config.url
          if (this.status !== 200 && this.status !== 304) {
            let mx = xhrList.findIndex((v, i) => {
              return v.xhr === xhr
            })
            if (_data && mx) {
              mx.params = _data
            }
            console.log('mx', mx)
            console.log('mx', mx.toString())
          }
        }
      }, false)
      send.call(this, _data)
    }
  }
  sendMsg (type, msg) {

  }
}

class MonitorError {
  constructor (o) {
    this.msg = ''  // 错误的具体信息
    this.url = ''  // 错误所在的url
    this.line = '' // 错误所在的行
    this.col = ''  // 错误所在的列
    this.time = '' // 时间
    Object.assign(this, o)
  }
  toString () {
    let self = this
    let str = ''
    for (let k in self) {
        if (self[k] === null || self[k] === undefined) {
            self[k] = 'null'
        }
        str += '&'+ k + '=' + self[k].toString()
    }
    return str = str.replace('&', '').replace(/\n|\s/g, '')
  }
}

class MonitorXhr {
  constructor (o) {
    this.method = ''
    this.url = ''
    this.bool = ''
    this.params = ''
    this.xhr = null
    Object.assign(this, o)
  }
  toString () {
    let self = this
    let str = ''
    for (let k in self) {
        if (k === 'xhr') continue;
        if (self[k] === null || self[k] === undefined) {
            self[k] = 'null'
        }
        str += '&'+ k + '=' + self[k].toString()
    }
    return str = str.replace('&', '').replace(/\n|\s/g, '')
  }
}

window && (window.Monitor = Monitor)

