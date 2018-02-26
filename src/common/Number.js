/**
 * [浮点数加法计算]
 * @param  {Number} v1 [description]
 * @param  {Number} v2 [description]
 * @return {[type]}    [description]
 */
function mul (v1, v2) {
  let decimal = 0
  let m1 = v1.toString()
  let m2 = v2.toString()
  try {
    decimal += (m1.split('.')[1] || '').length
    decimal += (m2.split('.')[1] || '').length
  } catch (e) {
    console.log(e);
  }
  return Number(m1.replace('.', '')) * Number(m2.replace('.', '')) / Math.pow(10, decimal);
}

/**
 * [浮点数除法计算]
 * @param  {Number} v1 [description]
 * @param  {Number} v2 [description]
 * @return {[type]}    [description]
 */
function div (v1, v2) {
  let decimal = 0
  let m1 = v1.toString()
  let m2 = v2.toString()
  decimal = (m2.split('.')[1] || '').length - (m1.split('.')[1] || '').length
  return Number(m1.replace('.', '')) / Number(m2.replace('.', '')) * Math.pow(10, decimal)
}

/**
 * [浮点数加法计算]
 * @param  {Number} v1 [description]
 * @param  {Number} v2 [description]
 * @return {[type]}    [description]
 */
function add (v1, v2) {
  let decimal = 0
  let m1 = v1.toString()
  let m2 = v2.toString()
  decimal = Math.pow(10, Math.max((m1.split('.')[1] || '').length, (m2.split('.')[1] || '').length))
  return (mul(Number(v1), decimal) + mul(Number(v2), decimal)) / decimal
}

/**
 * [浮点数减法计算]
 * @param  {Number} v1 [description]
 * @param  {Number} v2 [description]
 * @return {[type]}    [description]
 */
function sub (v1, v2) {
  let decimal = 0
  let m1 = v1.toString()
  let m2 = v2.toString()
  decimal = Math.pow(10, Math.max((m1.split('.')[1] || '').length, (m2.split('.')[1] || '').length))
  return (mul(Number(v1), decimal) - mul(Number(v2), decimal)) / decimal
}

/**
 * [是否偶数]
 * @param  {[type]}  v [description]
 * @return {Boolean}   [description]
 */
function isEven (v) {
  return v % 2 === 0
}

/**
 * [校验数字是否越界]
 * @param  {[type]} v [description]
 * @return {[type]}     [description]
 */
function checkBoundary (v) {
  if (v > Number.MAX_SAFE_INTEGER || v < Number.MIN_SAFE_INTEGER) {
    // console.warn(`${v} is beyond boundary when transfer to integer, the results may not be accurate`);
    return true
  }
  return false
}

/**
 * [四舍五入]
 * @param  {[type]} v   [description]
 * @param  {[type]} ratio [description]
 * @return {[type]}       [description]
 */
// function round (v, ratio) {
//   const base = Math.pow(10, ratio);
//   return divide(Math.round(times(v, base)), base);
// }

/**
 * [截取小数位]
 * @param  {[type]} v       [description]
 * @param  {[type]} decimal [description]
 * @return {[type]}         [description]
 */
function toFixed (v, decimal) {
  return Number((parseInt(v * Math.pow(10, decimal) + 0.5) / Math.pow(10, decimal) + '').toFixed(decimal))
}

/**
 * [千分位格式化]
 * @param  {[type]} v [description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function thousands (v, n) {
  let s = ('' + v).split('.')
  let d = s.length > 1 ?  '.' + (n > -1 ? s[1].substring(0, n) : s[1]) : ''
  return s[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + d
}

/**
 * [矫正浮点数误差]
 * @param  {Number} v       [需要矫正的数]
 * @param  {Number} precision [精度]
 * @return {[type]}           [description]
 */
function strip(v, precision = 2) {
  return +parseFloat(v.toPrecision(precision))
}

export { mul, div, add, sub, isEven, checkBoundary, toFixed, strip}
