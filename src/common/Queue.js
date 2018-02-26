/**
 * 异步队列
 */
class Queue {
  constructor (arr) {
    this.list = []
    this.index = 0
    this.isStop = false
    this.isParallel = false
    if (arr && typeof arr === 'array') {
      this.list.concat(arr)
    }
  }
  next () {
    let self = this
    if (self.index >= self.list.length - 1 || self.isStop || self.isParallel) return
    const cur = self.list[++self.index]
    cur(self.next.bind(self))
  }
  add (...fn) {
    fn.forEach( function(v, i) {
      if (typeof v !== 'function') {
        throw new Error('is Not Function')
      }
    })
    this.list.push(...fn)
    return this
  }
  stop () {
    this.isStop = true
    return this
  }
  retry () {
    this.isStop = false
    this.run()
    return this
  }
  goOn () {
    this.isStop = false
    this.next()
    return this
  }
  concurrent () {
    let self = this
    self.isParallel = true
    for (const fn of self.list) {
      fn(self.next.bind(self))
    }
    return this
  }
  run (...args) {
    let self = this
    const cur = self.list[self.index]
    typeof cur === 'function' && cur(self.next.bind(self))
  }
}

window && (window.Queue = Queue)

export default Queue
