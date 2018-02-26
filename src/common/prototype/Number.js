import * as extend from '../Number'

Number.prototype._mul = function (v) {
  return extend.mul(this, v)
}