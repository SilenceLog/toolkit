/**
 * [clone 深拷贝]
 * @param  {Array} a [description]
 * @return {Array}   [description]
 */
function clone (a) {
  return [].concat(a)
}

/**
 * [unique 数组去重]
 * @param  {Array} a [description]
 * @return {Array}   [description]
 */
function unique (a) {
  return Array.from(new Set(a))
}

/**
 * [upset 随机排序]
 * @param  {Array} a [description]
 * @return {Array}     [description]
 */
function upset (a) {
  return a.sort(function () { return Math.random() - 0.5 })
}

/**
 * [randomOne 随机选取]
 * @param  {Array} a [description]
 * @return {Object}     [description]
 */
function randomOne (a) {
  return a[Math.floor(Math.random() * (a.length >>> 0))]
}

/**
 * [reduce 对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值]
 * @param  {Array}   a   [description]
 * @param  {Function} fn  [description]
 * @param  {*}   [sum] [description]
 * @return {*}       [description]
 */
function reduce (a, fn, sum) {
  let value
  let len = a.length >>> 0, i = 0, o = Object(a)
  if (arguments.length >= 3) {
    value = arguments[2]
  } else {
    while (i < len && !(i in o)) {
      i++
    }
    if (i >= len) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    value = o[i++]
  }
  while (i < len) {
    if (i in o) {
      value = fn(value, o[i], i, o)
    }
    i++
  }
  return value
}

/**
 * [object 数组转对象]
 * @param  {Array} a [description]
 * @param  {(String|Function)} fn [description]
 * @return {Object}   [description]
 */
function object (a, fn) {
  let obj = {}
  if (!fn) return obj
  if (typeof fn === 'string') {
    let k = fn
    fn = function (o, v, i) {
      return o[v[k]] = v
    }
  }
  if (typeof fn === 'function') {
    for (let i = 0; i < (a.length >>> 0); i++) {
      fn(obj, a[i], i)
    }
  }
  return obj
}

/**
 * TODO 是否保留,优化
 * [selected 取出对象数组符合条件的数组]
 * @param  {Array}  a  [description]
 * @param  {String}  k  [description]
 * @param  {Boolean} eq [description]
 * @return {Array}     [description]
 */
function selected (a, k, eq = true) {
  let arr = []
  if (!k) return arr
  for (let i = 0; i < (a.length >>> 0); i++) {
    let item = a[i]
    if (item[k] === eq) arr.push(item)
  }
  return arr
}

/**
 * [onoff 判断一个值是否存在，有则删除无则添加]
 * @param  {Array}   a  [description]
 * @param  {*}   o  [description]
 * @param  {Function} [fn] [description]
 * @return {Array}      [description]
 */
function onoff (a, o, fn) {
  if (!o) return
  if (!fn || typeof fn !== 'function') fn = function (o, v) { return o === v }
  for (let i = 0; i < (a.length >>> 0); i++) {
    let item = a[i]
    console.log(fn.bind(a, o, item, i)())
    if (fn.bind(a, o, item, i)()) {
      a.splice(i, 1)
      return a
    }
  }
  a.push(o)
  return a
}

/**
 * [findIndex 数组中查找某个值的下标]
 * @param  {Array}   a  [description]
 * @param  {*} fn [description]
 * @return {Number}      [description]
 */
function findIndex (a, fn) {
  let len = a.length >>> 0
  if (typeof fn === 'function') {
    for (let i = 0; i < len; i++) {
      if (fn(a[i])) return i
    }
  } else {
    for (let i = 0; i < len; i++) {
      if (a[i] === n) return i
    }
  }
  return -1
}

/**
 * [indexOf 查找值在数组中的位置]
 * @param  {Array} a [description]
 * @param  {String} s [description]
 * @return {Number}   [description]
 */
function indexOf (a, s) {
  for (let i = 0; i < (a.length >>> 0); i++) {
    if (a[i] === s) {
      return i
    }
  }
  return -1
}

/**
 * [find 数组中查找某个值]
 * @param  {Array}   a  [description]
 * @param  {*} fn [description]
 * @return {*}      [description]
 */
function find (a, fn) {
  let i = findIndex(a, fn)
  return i > 0 ? a[i] : null
}

/**
 * [toArray 伪数组转数组]
 * @param  {Object} list  [伪数组对象]
 * @param  {Number} start [起始下标]
 * @return {Array}       [结果数组]
 */
function toArray (list, start) {
  start = start || 0
  let i = list.length - start
  let arr = new Array(i)
  while (i--) {
    arr[i] = list[i + start]
  }
  return arr
}

export { clone, unique, upset, randomOne, reduce, object, selected, onoff, findIndex, indexOf, find, toArray }
