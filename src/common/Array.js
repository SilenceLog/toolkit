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

/**
 * [unique 数组去重]
 * @return {[type]} [description]
 */
function unique (a) {
  return Array.from(new Set(a))
}

/**
 * [upset 随机排序]
 * @param  {[type]} a [description]
 * @return {[type]}     [description]
 */
function upset (a) {
  return a.sort(function(){ return Math.random() - 0.5});
}

/**
 * [randomOne 随机选取]
 * @param  {[type]} a [description]
 * @return {[type]}     [description]
 */
function randomOne(a) {
  return a[Math.floor(Math.random() * a.length)];
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

/**
 * TODO 是否保留,优化
 * [selected 取出对象数组符合条件的数组]
 * @param  {[type]}  a  [description]
 * @param  {[type]}  k  [description]
 * @param  {Boolean} eq [description]
 * @return {[type]}     [description]
 */
function selected (a, k, eq=true) {
  let arr = []
  if (!k) return arr
  for (let i = 0; i < a.length; i++) {
    let item = a[i]
    if (item[k] === eq) arr.push(item)
  }
  return arr
}

/**
 * TODO 简化参数2、3
 * [onoff 判断一个值是否存在，有则删除无则添加]
 * @param  {[type]}   a  [description]
 * @param  {[type]}   o  [description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function onoff (a, o, fn) {
  if (!o || typeof fn !== 'function') return
  for (let i = 0; i < a.length; i++) {
    let item = a[i]
    if (fn.bind(a, o, item, i)()) {
      return a.splice(i, 1);
    }
  }
  a.push(o)
}

/**
 * [find 数组中查找某个值]
 * @param  {[type]}   a  [description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function find (a, fn) {
  let i = findIndex(a, fn)
  return i > 0 ? a[i] : null
}

/**
 * TODO优化
 * [findIndex 数组中查找某个值的下标]
 * @param  {[type]}   a  [description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function findIndex (a, fn) {
  let i = a.length
  while (i--) {
    let item = a[i]
    if (typeof fn === 'function') {
      if (obj(item)) {
        return i
      }
    } else {
      if (item === fn) {
        return i
      }
    }
  }
  return -1
}

export { clone, indexOf, unique, object }
