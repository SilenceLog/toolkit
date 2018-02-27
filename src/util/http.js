// const isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
import { formatParams } from '../common/Object.js'
export default class Http {
  constructor () {
    this.ajaxConfig = {
      timeout: -1,
      dataFilter () {
      }
    }
    this.jsonpConfig = {

    }
  }
  ajax (options) {
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = (options.dataType || 'JSON').toUpperCase()
    // options.dataFilter
    // timeout
    let params = null
    let xhr = null
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      //IE6及其以下版本浏览器
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.responseType = options.dataType
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var status = xhr.status
        if (status >= 200 && status < 300) {
          options.success && options.success(xhr.responseText, xhr.responseXML)
        } else {
          options.fail && options.fail(status)
        }
      }
    }
    if (options.type === 'GET') {
      params = this.formatParams(options.data)
      xhr.open('GET', options.url + '?' + params, true)
      xhr.send(null)
    } else if (options.type === 'POST') {
      params = options.data
      xhr.open('POST', options.url, true)
      //设置表单提交时的内容类型
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(params)
    }
  }
  jsonp () {

  }
  formatParams (data) {
    return formatParams(data)
  }
}
window && (window.Http = Http)