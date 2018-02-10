/**
 * [new时间对象兼容方法]
 * @param  {[type]} s [description]
 * @return {[type]}   [description]
 */
function newDate (s) {
  return new Date(s.replace(/\s/, 'T'))._format(fmt)
}

/**
 * [时间格式化]
 * @param  {[type]} d   [description]
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
function format (d, fmt) {
  if (d instanceof !== Date) {
    throw new Error('is not Date')
  }
  var o = {
    'M+': d.getMonth() + 1, //月份
    'd+': d.getDate(), //日
    'H+': d.getHours(), //小时
    'm+': d.getMinutes(), //分
    's+': d.getSeconds(), //秒
    'q+': Math.floor((d.getMonth() + 3) / 3), //季度
    'S': d.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

/**
 * [自定义事件格式化]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
function fm (date) {
  var self = date
  var defaults = {
    year : 60*60*24*365,
    month : 60*60*24*30,
    week : 60*60*24*7,
    day : 60*60*24,
    hour : 60*60,
    minute : 60,
    seconds : 1
  }
  var timeDifference = Math.abs(parseInt((new Date().getTime() - self.getTime())/1000))
  var str = ''
  if (timeDifference < defaults.minute) {
    str = '刚刚'
  }else if (timeDifference < defaults.hour) {
    var min = parseInt(timeDifference / defaults.minute)
    str = min + '分钟前'
  }else if (timeDifference < defaults.day) {
    var h = parseInt(timeDifference / defaults.hour)
    str = h + '小时前 '
  }else if (timeDifference < defaults.day * 3) {
    var d = parseInt(timeDifference / defaults.day)
    var htime = format('HH:mm:ss')
    if (d===1) {
      str = '昨天 ' + htime
    }else if (d===2){
      str = '前天 ' + htime
    }else{
      str = d +'天前' + htime
    }
  }else{
    str = format('yyyy-MM-dd HH:mm:ss')
  }
  return str
}
