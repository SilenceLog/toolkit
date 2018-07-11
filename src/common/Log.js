class Log () {
  constructor (el) {
    this.prefix = ''
  }
  l () {
    let arr = Array.prototype.slice.call(arguments)
    arr.unshift(prefix)
    console.log.apply(console, arr)
  }
}