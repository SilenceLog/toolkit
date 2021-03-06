import { isArray } from './Type.js'
// /**
//  * [noop description]
//  * @return {[type]} [description]
//  */
// function noop () {}

// class Promise {
//   /**
//    * [constructor 构造方法]
//    * @param  {Functin} resolver [description]
//    */
//   constructor (resolver) {
//     this._state = Promise.PENDING
//     this._result = undefined
//     this._subscribers = []
//     if (noop !== resolver) {
//       typeof resolver !== 'function' && needsResolver();
//       this instanceof Promise ? initializePromise(this, resolver) : needsNew();
//     }
//   }
// }
// // 进行中
// Promise.PENDING = 0
// // 已成功
// Promise.FULFILLED = 1
// // 已失败
// Promise.REJECTED = 2



// export Promise



var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
// 空操作
function noop() {};
// isArray
var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  }
}
else {
  _isArray = Array.isArray
}
var isArray = _isArray;

/**
 * @class Promise
 * @param {[type]} resolver [function]
 */
function Promise(resolver) {
  this._state = PENDING;
  this._result = undefined;
  this._subscribers = [];
  // 初始化跑一遍resolver()
  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
};
Promise.resolve = resolve;
Promise.reject  = reject;
Promise.all     = all;
Promise.race    = race;

Promise.prototype = {
  constructor: Promise,
  then: then,
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};
function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor')
}
function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
}
/**
 * [initializePromise 初始化Promise并执行resolver回调]
 * @param  {[type]} promise  [Promise对象]
 * @param  {[type]} resolver [resolver回调]
 */
function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}
/**
 * [_resolve resolve处理]
 * @param  {[type]} promise [Promise对象]
 * @param  {[type]} value   [回调参数]
 */
function _resolve (promise, value) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._result = value;
    promise._state = FULFILLED;
}
/**
 * [_resolve reject处理]
 * @param  {[type]} promise [Promise对象]
 * @param  {[type]} value   [回调参数]
 */
function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._result = reason;
  promise._state = REJECTED;
}
function ErrorObject () {
  this.error = null;
}
var TRY_CATCH_ERROR = new ErrorObject();
/**
 * [then 异步回调]
 * @param  {[function]} resolve [resolve回调]
 * @param  {[function]} reject  [reject回调]
 */
function then (resolve, reject) {
  var _arguments = arguments;
  var parent = this;
  var child = new this.constructor(noop);

  var _state = parent._state;
  var callback = _arguments[_state - 1];
  if (child._state !== PENDING) {
    // noop
  }else if (_state === FULFILLED) {
    _resolve(child, parent._result);
  }else if (_state === REJECTED) {
    _reject(child, parent._result);
  }
  if (typeof callback === 'function') {
    try {
      nextTick(callback, parent._result);
    } catch (e) {
      TRY_CATCH_ERROR.error = e;
      return TRY_CATCH_ERROR;
    }
  }
  return child;
}

function resolve (object) {
  var Constructor = this;
  // 如果传进来的参数是一个Promise对象，则直接返回该参数
  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop)
  _resolve(promise, object);
  return promise;
}

function reject (reason) {
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise
}

function all (entries) {
  return new Enumerator(this, entries).promise;
}

function Enumerator (Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      _resolve(this.promise, this._result);
    } else {
      this._enumerate();
    }
  }
  else {
    _reject(this.promise, validationError())
  }
}
function validationError() {
  return new Error('Array Methods must be provided an Array');
}
Enumerator.prototype._enumerate = function () {
  var _input = this._input;
  var promise = this.promise;
  for (var i = 0, l = _input.length; i < l; i++) {
    var currentPromise = _input[i];
    if (!(currentPromise instanceof Promise) || currentPromise._state === PENDING) {
      currentPromise = resolve(currentPromise);
      promise._result[i] = currentPromise._result;
    }
    if (currentPromise._state === REJECTED) {
      promise._result = currentPromise._result;
    }
    promise._state = currentPromise._state;
  }
}

function race (entries) {
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function(_, reject) {
      return reject(new TypeError('You must pass an array to race.'))
    });
  }
  else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
 * [nextTick 下一进程处理]
 * @param  {Function} callback [回调函数]
 * @param  {[type]}   value    [回调参数值]
 */
function nextTick (callback, value) {
  setTimeout(callback, 0, value);
}