/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 异步队列
 */
var Queue = function () {
  function Queue(arr) {
    _classCallCheck(this, Queue);

    this.list = [];
    this.index = 0;
    this.isStop = false;
    this.isParallel = false;
    if (arr && typeof arr === 'array') {
      this.list.concat(arr);
    }
  }

  _createClass(Queue, [{
    key: 'next',
    value: function next() {
      var self = this;
      if (self.index >= self.list.length - 1 || self.isStop || self.isParallel) return;
      var cur = self.list[++self.index];
      cur(self.next.bind(self));
    }
  }, {
    key: 'add',
    value: function add() {
      var _list;

      for (var _len = arguments.length, fn = Array(_len), _key = 0; _key < _len; _key++) {
        fn[_key] = arguments[_key];
      }

      fn.forEach(function (v, i) {
        if (typeof v !== 'function') {
          throw new Error('is Not Function');
        }
      });
      (_list = this.list).push.apply(_list, fn);
      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.isStop = true;
      return this;
    }
  }, {
    key: 'retry',
    value: function retry() {
      this.isStop = false;
      this.run();
      return this;
    }
  }, {
    key: 'goOn',
    value: function goOn() {
      this.isStop = false;
      this.next();
      return this;
    }
  }, {
    key: 'concurrent',
    value: function concurrent() {
      var self = this;
      self.isParallel = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = self.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _fn = _step.value;

          _fn(self.next.bind(self));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }
  }, {
    key: 'run',
    value: function run() {
      var self = this;
      var cur = self.list[self.index];
      typeof cur === 'function' && cur(self.next.bind(self));
    }
  }]);

  return Queue;
}();

window && (window.Queue = Queue);

exports.default = Queue;

/***/ })
/******/ ]);