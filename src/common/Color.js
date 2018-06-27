import { isNumber, isString } from 'Type.js'

class Color {
  constructor (color) {
    this.red = 255
    this.green = 255
    this.blue = 255
    this.alpha = 1
  }
  format (fmt) {
    var o = {
      '\\$R': this.R, // 红色(十六进制)
      '\\$G': this.G, // 绿色(十六进制)
      '\\$B': this.B, // 蓝色(十六进制)
      '\\$A': this.A, // 透明度
      '\\$r': this.r, // 红色(十进制)
      '\\$g': this.g, // 绿色(十进制)
      '\\$b': this.b, // 蓝色(十进制)
      '\\$a': this.a // 透明度 (parseInt(this.A, 16) * 100/255/100).toFixed(2)
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (o[k]))
    }
    return fmt
  }
  checkValue (v, i, a) {
    let min = i || 0
    let max = a || 255
    try {
      if (typeof v === 'string') {
        v = parseInt(v, 16)
        if (a) v = Number((v / 255).toFixed(2))
      }
      if (min > v || v > max || typeof v !== 'number') {
        throw new Error('value error')
      }
    } catch (e) {
      console.log(e)
    }
    return v
  }
  get r () {
    return this.red
  }
  set r (v) {
    this.red = this.checkValue(v)
  }
  get g () {
    return this.green
  }
  set g (v) {
    this.green = this.checkValue(v)
  }
  get b () {
    return this.blue
  }
  set b (v) {
    this.blue = this.checkValue(v)
  }
  get a () {
    return this.alpha
  }
  set a (v) {
    this.alpha = this.checkValue(v, 0, 1)
  }
  get R () {
    return Number(this.r).toString(16)
  }
  set R (v) {
    this.r = v
  }
  get G () {
    return Number(this.g).toString(16)
  }
  set G (v) {
    this.g = v
  }
  get B () {
    return Number(this.b).toString(16)
  }
  set B (v) {
    this.b = v
  }
  get A () {
    return Number(this.a * 100 * 255 / 100).toString(16)
  }
  set A (v) {
    this.a = v
  }
}
