/**
 * [capitalizeEveryWord 首字母转大写]
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function capitalizeEveryWord (str) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase())
}

/**
 * [randomNumber 生成随机字符串]
 * @param  {Number} count [description]
 * @return {String}       [description]
 */
function randomNumber(count){
  return Math.random().toString(count).substring(2)
}

/**
 * [trim 去空格]
 * @param  {String} str  [description]
 * @param  {Number} type [1-所有空格  2-前后空格  3-前空格 4-后空格（默认1）]
 * @return {String}      [description]
 */
function trim (str, type=1) {
  switch (type){
    case 1:return str.replace(/\s+/g, '')
    case 2:return str.replace(/(^\s*)|(\s*$)/g, '')
    case 3:return str.replace(/(^\s*)/g, '')
    case 4:return str.replace(/(\s*$)/g, '')
    default:return str
  }
}
