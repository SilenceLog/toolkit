
function getType (v) {
  const s = Object.prototype.toString.call(v)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

// ['Undefined', 'Null', 'Object', 'Array', 'String', 'Number', 'Boolean', 'RegExp', 'Function'].forEach( (t) => {
//   this['is' + t] = (v) => {
//     return getType(v) === t.toLowerCase()
//   }
// })

function isUndefined (v) {
  return getType(v) === 'Undefined'.toLowerCase()
}

function isNull (v) {
  return getType(v) === 'Null'.toLowerCase()
}

function isObject (v) {
  return getType(v) === 'Object'.toLowerCase()
}

function isArray (v) {
  return Array.isArray ? Array.isArray(v) : getType(v) === 'Array'.toLowerCase()
}

function isString (v) {
  return getType(v) === 'String'.toLowerCase()
}

function isNumber (v) {
  return getType(v) === 'Number'.toLowerCase()
}

function isBoolean (v) {
  return getType(v) === 'Boolean'.toLowerCase()
}

function isRegExp (v) {
  return getType(v) === 'RegExp'.toLowerCase()
}

function isFunction (v) {
  return getType(v) === 'Function'.toLowerCase()
}

function isNaN (v) {
  return Number.isNaN ? Number.isNaN(v) : v !== v
}

function isDOMElement (o) {
  return !!(o && typeof window !== 'undefined' && (o === window || o.nodeType))
}

function isPromise (v) {
  return isObject(v) && isFunction(v.then)
}

export {getType, isUndefined, isNull, isObject, isArray, isString, isNumber, isBoolean, isRegExp, isFunction, isNaN, isDOMElement, isPromise}