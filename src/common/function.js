/**
 * [getFunName 获取方法名称 如果有代码压缩这个方法无效]
 * @param  {Function} fn [description]
 * @return {[type]}     [description]
 */
getName (fn) {
  if (!fn && typeof fn !== 'function') {
    throw new Error('is not function')
  }
  let fnStr = fn.toString()
  let const re = /function\s*(\w*)/i
  let matches = re.exec(fnStr)
  return matches.lengt ? matches[1] : ''
}

/**
 * [eval string转function]
 * @param  {String} fnStr [description]
 * @return {Function}      [description]
 */
eval (fnStr) {
  if (/\{/.test(fnStr)) {
    return new Function('return ' + fnStr)()
  } else {
    return fnStr
  }
}