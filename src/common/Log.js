class Log () {
  constructor (el) {
    this.prefix = ''
  }
}

function log () {
  const prefix = '(app)'
  let arr = Array.prototype.slice.call(arguments)
  arr.unshift(prefix)
  console.log.apply(console, arr)
}