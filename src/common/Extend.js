/**
 * 构造方法继承
 * @param  {[type]} Child  [description]
 * @param  {[type]} Parent [description]
 * @return {[type]}        [description]
 */
function extend(Child, Parent) {
  var F = function() {}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  Child.uber = Parent.prototype
}

/**
 * 对象浅继承
 * @param  {[type]} o [description]
 * @return {[type]}   [description]
 */
function object(Parent, Child) {
  Child = Child || {}
  function F() {}
  F.prototype = Parent
  var obj = new F()
  for (var k in Child) {
    obj[k] = Child[k]
  }
  return obj
}

/**
 * 深继承
 * @param  {[type]} p [description]
 * @param  {[type]} c [description]
 * @return {[type]}   [description]
 */
function deepObject(p, c) {
  c = c || {}
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }　　　　
  return c
}


/**
 * 浅拷贝
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
function extendCopy(p) {
  var c = {}
  for (var i in p) {
    c[i] = p[i]
  }
  c.uber = p
  return c
}

/**
 * [deepCopy 深度对象克隆]
 * @param  {[type]} Obj [参数对象]
 */
function deepCopy(Obj) {
  // 定义buf进行缓存
  var buf // 创建一个空数组
  // if Array
  if (Obj instanceof Array) {
    // dosomething for Array Obj
    buf = []
    var i = Obj.length
    while (i--) {
      buf[i] = deepCopy(Obj[i])
    }
    return buf
  }
  // if Object and Obj is not a function
  if (Obj instanceof Object && typeof Obj !== 'function') {
    // dosomething for Object Obj
    buf = {} // 创建一个空对象
    for (var key in Obj) {
      buf[key] = deepCopy(Obj[key])
    }
    return buf
  } else {
    // dosomething for other
    return Obj
  }
}

function noCopy (p, c) {
  c = c || {}
  for (var i in p) {
    if (p[i] !== null && p[i] !== undefined) {
      if (typeof p[i] === 'object') {
        c[i] = (p[i].constructor === Array) ? [] : {}
        deepCopy(p[i], c[i])
      } else {
        c[i] = p[i]
      }
    }
  }　　　　
  return c
}

export { extend, object, deepObject, extendCopy, deepCopy}