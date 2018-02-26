import Queue from '../../src/common/Queue.js'

jest.useFakeTimers();

test('Queue add', () => {
  const fn1 = function (next) { next();};
  const fn2 = function (next) { next();};
  const fn3 = function (next) { next();};
  const fn4 = function (next) { next();};
  let q = new Queue();
  q.add(fn1, fn2, fn3, fn4);
  expect(q.list.length).toBe(4)
});

test('Queue async', () => {
  const drink = jest.fn();
  const fn1 = function (next) { drink(); next();};
  const fn2 = function (next) { drink(); next();};
  const fn3 = function (next) { drink(); next();};
  const fn4 = function (next) { drink(); next();};
  let q = new Queue();
  q.add(fn1, fn2, fn3, fn4).run();
  expect(drink).toHaveBeenCalledTimes(4);
});

test('Queue add', () => {
  const fn1 = function (next) { next();};
  const fn2 = function (next) { next();};
  const fn3 = function (next) { next();};
  const fn4 = function (next) { next();};
  let q = new Queue();
  q.add(fn1, fn2, fn3, fn4);
  expect(q.list.length).toBe(4)
});