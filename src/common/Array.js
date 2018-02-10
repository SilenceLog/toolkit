/**
 * [clone 深拷贝]
 * @param  {[type]} a [description]
 * @return {[type]}   [description]
 */
function clone (a) {
  return [].concat(a)
}

/**
 * [indexOf 查找值在数组中的位置]
 * @param  {[type]} a [description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function indexOf (a, n) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] === n) {
      return i
    }
  }
  return -1
}

function unique () {

}

/**
 * [object 数组转对象]
 * @param  {[type]} a [description]
 * @param  {[type]} k [description]
 * @return {[type]}   [description]
 */
function object (a, k) {
  let obj = {}
  if (!k) return obj
  if (typeof k === 'string') {
    for (let i = 0; i < a.length; i++) {
      let item = a[i]
      obj[item[k]] = item
    }
  } else if (typeof k === 'function') {
    for (let i = 0; i < a.length; i++) {
      let item = a[i]
      obj[k.bind(a, item)] = item
    }
  }
  return obj
}

export { clone, indexOf, unique, object }
