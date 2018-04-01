
/**
 * [getType 获取状态值]
 * @param  {*} v [description]
 * @return {String}   [description]
 */
function getType (v) {
  const s = Object.prototype.toString.call(v)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

/**
 * [isUndefined 是否Undefined]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isUndefined (v) {
  return getType(v) === 'Undefined'.toLowerCase()
}

/**
 * [isNull 是否null]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isNull (v) {
  return getType(v) === 'Null'.toLowerCase()
}

/**
 * [isObject 是否对象]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isObject (v) {
  return getType(v) === 'Object'.toLowerCase()
}

/**
 * [isArray 是否数组]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isArray (v) {
  return Array.isArray ? Array.isArray(v) : getType(v) === 'Array'.toLowerCase()
}

/**
 * [isString 是否字符串类型]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isString (v) {
  return getType(v) === 'String'.toLowerCase()
}

/**
 * [isNumber 是否数字]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isNumber (v) {
  return getType(v) === 'Number'.toLowerCase()
}

/**
 * [isBoolean 判断是否布尔值]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isBoolean (v) {
  return getType(v) === 'Boolean'.toLowerCase()
}

/**
 * [isRegExp 是否正则表达式]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isRegExp (v) {
  return getType(v) === 'RegExp'.toLowerCase()
}

/**
 * [isFunction 是否Function]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isFunction (v) {
  return getType(v) === 'Function'.toLowerCase()
}

/**
 * [isNaN 是否NaN]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isNaN (v) {
  return Number.isNaN ? Number.isNaN(v) : v !== v
}

/**
 * [isDOMElement 是否dom]
 * @param  {*}  o [description]
 * @return {Boolean}   [description]
 */
function isDOMElement (o) {
  return !!(o && typeof window !== 'undefined' && (o === window || o.nodeType))
}

/**
 * [isPromise 是否promise]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isPromise (v) {
  return getType(v) === 'Promise'.toLowerCase() || (isObject(v) && isFunction(v.then))
}

/**
 * [isMongooseQuery 是否mongoose对象]
 * @param  {*}  v [description]
 * @return {Boolean}   [description]
 */
function isMongooseQuery (v) {
  return v !== null && typeof v === 'object' && typeof v.exec === 'function';
}

/**
 * [isJSON 是否json字符串]
 * @param  {*}  str [description]
 * @return {Boolean}     [description]
 */
function isJSON (str) {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str)
      return typeof obj == 'object' && obj
    } catch (e) {
      console.log('error:' + str + '!' + e)
      return false
    }
  }
  console.log('It is not a string!')
}

export {getType, isUndefined, isNull, isObject, isArray, isString, isNumber, isBoolean, isRegExp, isFunction, isNaN, isDOMElement, isPromise, isMongooseQuery, isJSON}