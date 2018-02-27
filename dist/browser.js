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

var _Type = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage(config) {
    _classCallCheck(this, Storage);

    this.config = {
      driver: '',
      path: '',
      domain: '',
      secure: '',
      max: 0
    };
    Object.assign(this.config, config);
  }

  _createClass(Storage, [{
    key: 'setItem',
    value: function setItem(k, v, end, path, domain, secure) {
      if (!k) return;
      if (this.config.driver === Storage.COOKIE) {
        if (/^(?:expires|max\-age|path|domain|secure)$/i.test(k)) return;
        domain = domain || this.config.domain;
        path = path || this.config.path;
        secure = secure || this.config.secure;
        var expires = '';
        if (end) {
          switch (end.constructor) {
            case Number:
              expires = end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + end;
              break;
            case String:
              expires = "; expires=" + end;
              break;
            case Date:
              expires = "; expires=" + end.toUTCString();
              break;
          }
        }
        this.db = encodeURIComponent(k) + '=' + encodeURIComponent(v) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');
      } else {
        if ((0, _Type.isArray)(v) || (0, _Type.isObject)(v)) {
          this.db.setItem(k, JSON.stringify(v));
        } else {
          this.db.setItem(k, v);
        }
      }
    }
  }, {
    key: 'hasItem',
    value: function hasItem(k) {
      return !!this.getItem(k);
    }
  }, {
    key: 'getItem',
    value: function getItem(k) {
      var value = null;
      switch (this.config.driver) {
        case Storage.LOCALSTORAGE:
          value = JSON.parse(this.db.getItem(k));
          break;
        case Storage.SESSIONSTORAGE:
          value = JSON.parse(this.db.getItem(k));
          break;
        case Storage.COOKIE:
          value = decodeURIComponent(this.db.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(k).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
          break;
        default:
          break;
      }
      return value;
    }
  }, {
    key: 'removeItem',
    value: function removeItem(k, path, domain) {
      if (!k || !this.hasItem(k)) return;
      domain = domain || this.config.domain;
      path = path || this.config.path;
      if (this.config.driver === Storage.COOKIE) {
        this.db = encodeURIComponent(k) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');
      } else {
        this.db.removeItem(k);
      }
    }
  }, {
    key: 'keys',
    value: function keys() {
      var keys = [];
      if (this.config.driver === Storage.COOKIE) {
        var keyArr = getCookieKeys(this.db);
        for (var i = 0; i < keyArr.length; i++) {
          keys[i] = decodeURIComponent(keyArr[i]);
        }
      } else {
        for (var _i = 0; _i < this.db.length; _i++) {
          keys[_i] = this.db.key(_i);
        }
      }
      return keys;
    }
  }, {
    key: 'key',
    value: function key(i) {
      var key = null;
      if (this.config.driver === Storage.COOKIE) {
        var keyArr = getCookieKeys(this.db);
        for (var j = 0; j < keyArr.length; j++) {
          if (i === j) key = decodeURIComponent(keyArr[i]);
          break;
        }
      } else {
        key = this.db.key(i);
      }
      return key;
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (this.config.driver === Storage.COOKIE) {
        var keyArr = getCookieKeys(this.db);
        for (var j = 0; j < keyArr.length; j++) {
          this.removeItem(keyArr[j]);
        }
      } else {
        this.db.clear();
      }
    }
  }, {
    key: 'db',
    get: function get() {
      var db = null;
      switch (this.config.driver) {
        case Storage.LOCALSTORAGE:
          db = window.localStorage;
          break;
        case Storage.SESSIONSTORAGE:
          db = window.sessionStorage || window.UserDataStorage && new UserDataStorage() || new cookieStorage();
          break;
        case Storage.COOKIE:
          db = document.cookie || window.cookie;
          break;
        default:
          // statements_def
          break;
      }
      return db;
    },
    set: function set(v) {
      switch (this.config.driver) {
        case Storage.LOCALSTORAGE:
          break;
        case Storage.SESSIONSTORAGE:
          break;
        case Storage.COOKIE:
          document.cookie && (document.cookie = v) || window.cookie && (window.cookie = v);
          break;
        default:
          // statements_def
          break;
      }
    }
  }]);

  return Storage;
}();

Storage.LOCALSTORAGE = 'localStorage';
Storage.SESSIONSTORAGE = 'sessionStorage';
Storage.COOKIE = 'cookie';

function getCookieKeys(c) {
  return c.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
}

window && (window.YStorage = Storage);

exports.default = Storage;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getType(v) {
  var s = Object.prototype.toString.call(v);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

// ['Undefined', 'Null', 'Object', 'Array', 'String', 'Number', 'Boolean', 'RegExp', 'Function'].forEach( (t) => {
//   this['is' + t] = (v) => {
//     return getType(v) === t.toLowerCase()
//   }
// })

function isUndefined(v) {
  return getType(v) === 'Undefined'.toLowerCase();
}

function isNull(v) {
  return getType(v) === 'Null'.toLowerCase();
}

function isObject(v) {
  return getType(v) === 'Object'.toLowerCase();
}

function isArray(v) {
  return Array.isArray ? Array.isArray(v) : getType(v) === 'Array'.toLowerCase();
}

function isString(v) {
  return getType(v) === 'String'.toLowerCase();
}

function isNumber(v) {
  return getType(v) === 'Number'.toLowerCase();
}

function isBoolean(v) {
  return getType(v) === 'Boolean'.toLowerCase();
}

function isRegExp(v) {
  return getType(v) === 'RegExp'.toLowerCase();
}

function isFunction(v) {
  return getType(v) === 'Function'.toLowerCase();
}

function isNaN(v) {
  return Number.isNaN ? Number.isNaN(v) : v !== v;
}

function isDOMElement(o) {
  return !!(o && typeof window !== 'undefined' && (o === window || o.nodeType));
}

exports.getType = getType;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isRegExp = isRegExp;
exports.isFunction = isFunction;
exports.isNaN = isNaN;
exports.isDOMElement = isDOMElement;

/***/ })
/******/ ]);