/**
 * [formatParams 对象转化成url参数字符串格式]
 * @param  {[type]} o [description]
 * @param  {[type]} j [description]
 * @return {[type]}      [description]
 */
function formatParams (o, j='&') {
  let arr = []
  for (let key in o) {
    if (!o[key] && o[key] !== 0) continue
    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(o[key])))
  }
  return arr.join(j)
}

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
    if(o1[key] !== o2[key]) return false
  }
  return true
}

/**
 * [joinKey description]
 * @param  {[type]} o [description]
 * @param  {String} j [description]
 * @return {[type]}   [description]
 */
function joinKey (o, j=',') {
  // Object.keys(o).join(',')
  let arr = []
  for (let key in o) {
    arr.push(key)
  }
  return arr.join(j)
}

export { formatParams }