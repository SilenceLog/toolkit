// const isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'

export default class Http {
  constructor () {
    this.ajaxConfig = {

    }
    this.jsonpConfig = {

    }
  }
  ajax (options) {
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = (options.dataType || 'JSON').toUpperCase()
    let params = null
    let xhr = null
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      //IE6及其以下版本浏览器
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
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
    let arr = []
    for (let key in data) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    }
    arr.push(('v=' + Math.random()).replace('.', ''))
    return arr.join('&')
  }
}
window && (window.Http = Http)