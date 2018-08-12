/**
 * [eqValue 非递归对象值是否相等]
 * @param  {[type]} o1 [description]
 * @param  {[type]} o2 [description]
 * @return {[type]}    [description]
 */
function eqValue (o1, o2) {
  const props1 = Object.getOwnPropertyNames(o1)
  const props2 = Object.getOwnPropertyNames(o2)
  if (Object.keys(props1).length !== Object.keys(props2).length) {
    return false
  }
  for (let key in o1) {
    if (o1[key] !== o2[key]) return false
  }
  return true
}

/**
 * [joinKey description]
 * @param  {[type]} o [description]
 * @param  {String} j [description]
 * @return {[type]}   [description]
 */
function joinKey (o, j = ',') {
  // Object.keys(o).join(',')
  let arr = []
  for (let key in o) {
    arr.push(key)
  }
  return arr.join(j)
}

/**
 * [clearEmpty 清除null、undefined值]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function clearEmpty (obj) {
  if (!obj && typeof obj !== 'object') return
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    }
  }
  return obj
}

/**
 * [toString 对象转String]
 * @param  {[type]}   obj [description]
 * @param  {Function} fn  [description]
 * @return {[type]}       [description]
 */
function toString (obj, fn) {
  if (!obj && typeof obj !== 'object') return
  let arr = []
  for (let key in obj) {
    if (fn && typeof fn === 'function') {
      arr.push(fn.call(this, key, obj[key], obj))
    } else {
      arr.push(`${key}:${obj[key]}`)
    }
  }
  return arr.length ? arr.join(';') : ''
}

export {clearEmpty, toString}
