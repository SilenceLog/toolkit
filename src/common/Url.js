
/**
 * [getQueryString 获取参数值]
 * @param  {String} name [参数名]
 * @param  {String} url [要截取的字符串]
 * @return {String}      [参数值]
 */
function getQueryString (name, url) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let result = ''
  if (!url) {
    url = window.location.search.substr(1)
  } else {
    url = url.replace(/.*\?/, '')
  }
  result = url.match(reg)
  if (result != null) return decodeURIComponent(result[2])
  return null
}
