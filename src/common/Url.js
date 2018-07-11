/**
 * [formatParams 对象转化成url参数字符串格式]
 * @param  {[type]} o [description]
 * @param  {[type]} j [description]
 * @return {[type]}      [description]
 */
function formatParams (o, j = '&') {
  let arr = []
  for (let key in o) {
    if (!o[key] && o[key] !== 0) continue
    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(o[key])))
  }
  return arr.join(j)
}

/**
 * [getQueryString 获取参数值]
 * @param  {String} name [参数名]
 * @param  {Object} param [{url:要截取的字符串, reg:结果匹配的正则}]
 * @return {String}      [参数值]
 */
function getQueryString (name, param) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let result = ''
  let url = ''
  if (!param.url) {
    url = window.location.search.substr(1)
  } else {
    url = param.url.replace(/.*\?/, '')
  }
  result = url.match(reg)
  if (result !== null) {
    let value = decodeURIComponent(result[2])
    if (param.reg) {
      let vreg = new RegExp(param.reg)
      let val = value.match(vreg)
      if (val !== null) return val[0]
      return null
    }
    return value
  }
  return null
}

// getQueryString('action', {
//   url: 'http://buytest.wokelink.com/sign-up.html?sharer_id=5ac3500808bce2523247a59d&catalog_id=5ab8b2e007eeb21cfe5532f8&last_cm_user=593769579981d7cac34888d5&action=collect#',
//   reg: '[^#]*'
// })

export { formatParams, getQueryString }
