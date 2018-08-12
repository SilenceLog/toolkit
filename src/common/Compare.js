/**
 * [diffValue 非递归差异对比]
 * @param  {Object} n [对比值]
 * @param  {Object} o [参照值]
 * @param  {Number} level [递归层级]
 * @return {Object}   [description]
 */
function diffValue (n, o, level) {
  let obj = {}
  for (let key in n) {
    if (o[key] === undefined) {
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
        case '[object Object]':
          if (Object.keys(n[key]) !== Object.keys(o[key])) obj[key] = n[key]
          break
        default:
          break
      }
    }
  }
  return obj
}

/**
 * [eq 是否相等]
 * @param  {*} n [description]
 * @param  {[type]} o [description]
 * @return {[type]}    [description]
 */
function eq (n, o) {
  /* eslint-disable no-self-compare */
  return n === o || (n !== n && o !== o)
}

export default {diffValue, eq}
