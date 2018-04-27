function run (fn) {
  let gen = fn()
  function next(err, data) {
    var result = gen.next(data)
    if (result.done) return
    console.log('result', result)
    if (result.value && typeof result.value === 'function') {
      result.value(next)
    } else {
      next(result.value)
    }
  }
  next()
}

function* g() {
  yield 2
  yield 3
  return 1
}

function* t() {
  yield 't'
  return 't'
}

run(g)


