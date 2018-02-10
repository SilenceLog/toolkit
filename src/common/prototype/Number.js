import * as extend from './extend/Number'
Number.prototype._mul = function (v) {
  return extend.mul(this, v)
}