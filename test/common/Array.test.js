import { clone, indexOf } from '../../src/common/Array.js'

test('Array clone', () => {
  let a = [1, 2, 3]
  let b = [{a: 1}, {a: 2}, {a: 3}]
  expect(clone(a) === a).toBe(false)
  expect(clone(a)).toEqual(a)
  expect(clone(b) === b).toBe(false)
  expect(clone(b)).toEqual(b)
});

test('Array indexOf', () => {
  let a = [1, 2, 3]
  let a1 = a[1]
  let a2 = 3
  let b = [{a: 1}, {a: 2}, {a: 3}]
  let b1 = b[1]
  let b2 = {a: 2}
  expect(indexOf(a, a1) > -1).toBe(true)
  expect(indexOf(a, a2) > -1).toBe(true)
  expect(indexOf(b, b1) > -1).toBe(true)
  expect(indexOf(b, b2) > -1).toBe(false)
});