_ = {
  /**
   * [diffValue 非递归差异对比]
   * @param  {[type]} n [description]
   * @param  {[type]} o [description]
   * @return {[type]}   [description]
   */
  diffValue (n, o) {
    let obj = {}
    for (let key in n) {
      if (!o[key]) {
        obj[key] = n[key]
        continue
      }
      if (/string|number|boolean/.test(typeof n[key])) {
        if (n[key] !== o[key]) obj[key] = n[key]
      } else if (typeof n[key] === 'object') {
        let type = Object.prototype.toString.call(n[key])
        switch (type) {
          case '[object Array]':
            if (n[key].length !== o[key].length) obj[key] = n[key]
            break
          default:
            break
        }
      }
    }
    return obj
  }
  /**
   * [getFunName 获取方法名称 如果有代码压缩这个方法无效]
   * @param  {[type]} fun [description]
   * @return {[type]}     [description]
   */
  getFunName (fun) {
    if (!fun && typeof fun !== 'function') {
      throw new Error('is not function')
    }
    let funStr = fun.toString()
    let const re = /function\s*(\w*)/i
    let matches = re.exec(funStr)
    return matches.lengt ? matches[1] : ''
  }

  /**
   * [eval string转function]
   * @param  {Function} fn [description]
   * @return {[type]}      [description]
   */
  eval (fn) {
    if (/\{/.test(fn)) {
      return new Function('return ' + fn)()
    } else {
      return fn
    }
  }

  /**
   * [eq 是否相等]
   * @param  {[type]} v1 [description]
   * @param  {[type]} v2 [description]
   * @return {[type]}    [description]
   */
  eq (v1, v2) {
    return v1 === v2 || (v1 !== v1 && v2 !== v2)
  }
}
