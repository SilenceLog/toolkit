/**
 * [cover 覆盖存在属性]
 * @param  {Object} o [description]
 * @param  {Object} n [description]
 * @return {Null}   [description]
 */
function cover (o, n) {
  for(let k in o) {
    if (n[k]) o[k] = n[k]
  }
}