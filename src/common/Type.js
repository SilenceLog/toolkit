function getType (v) {
  const s = Object.prototype.toString.call(v)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

['Undefined', 'Null', 'Object', 'Array', 'String', 'Number', 'Boolean', 'RegExp', 'Function'].forEach( (t) => {
  this['is' + t] = (v) => {
    return getType(v) === t.toLowerCase()
  }
})

function isNaN (v) {
  return Number.isNaN ? Number.isNaN(v) : v !== v
}

export {getType, isUndefined, isNull, isObject, isArray, isString, isNumber, isBoolean, isRegExp, isFunction, isNaN}