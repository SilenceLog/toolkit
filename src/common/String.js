/**
 * [capitalizeEveryWord 首字母转大写]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function capitalizeEveryWord (str) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase())
}