import Observer from '../../src/common/Observer.js'

test('Observer', () => {
  let obs = new Observer()
  let sum = {
    v: 0
  }
  let sumBe = 0
  function addfn (s, v) {
    s.v += v
  }
  function subfn1 (s, v) {
    s.v -= v
  }
  function subfn2 (s, v) {
    s.v -= v
  }
  obs.$on('add', (s, v) => {
    s.v += v
  })

  obs.$once('add', (s, v) => {
    s.v += v
  })

  obs.$on('add', addfn)

  obs.$on('sub', (s, v) => {
    s.v -= v
  })

  obs.$on('sub', [subfn1, subfn2])

  expect(Object.keys(obs._events).length).toBe(2)
  expect(obs._events['add'].length).toBe(3)
  expect(obs._events['sub'].length).toBe(3)
  expect(obs._events['div']).toBe(undefined)
  obs.$emit('add', sum, 1)
  sumBe += 3
  expect(sum.v).toBe(sumBe)
  obs.$emit('add', sum, 1)
  sumBe += 2
  expect(sum.v).toBe(sumBe)
  obs.$off('add', addfn)
  obs.$emit('add', sum, 1)
  sumBe += 1
  expect(sum.v).toBe(sumBe)
  obs.$off('sub', [subfn1, subfn2])
  expect(obs._events['sub'].length).toBe(1)
  obs.$off('sub')
  expect(Object.keys(obs._events).length).toBe(2)
  expect(obs._events['sub']).toBe(null)
  obs.$off()
  expect(Object.keys(obs._events).length).toBe(0)
});
