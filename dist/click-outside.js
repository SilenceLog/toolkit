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
/***/ (function(module, exports) {

(function (Vue) {
  function validate(binding) {
    if (typeof binding.value !== 'function') {
      console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.');
      return false;
    }
  }
  function isPopup(popupItem, elements) {
    if (!popupItem || !elements) return false;

    for (var i = 0, len = elements.length; i < len; i++) {
      try {
        if (popupItem.contains(elements[i])) {
          return true;
        }
        if (elements[i].contains(popupItem)) {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function isServer(vNode) {
    return typeof vNode.componentInstance !== 'undefined' && vNode.componentInstance.$isServer;
  }

  ClickOutside = {
    bind: function bind(el, binding, vNode) {
      if (!validate(binding)) return;

      // Define Handler and cache it on the element
      function handler(e) {
        if (!vNode.context) return;

        // some components may have related popup item, on which we shall prevent the click outside event handler.
        var elements = e.path || e.composedPath && e.composedPath();
        elements && elements.length > 0 && elements.unshift(e.target);

        if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return;

        el.__vueClickOutside__.callback(e);
      }

      // add Event Listeners
      el.__vueClickOutside__ = {
        handler: handler,
        callback: binding.value
      };
      !isServer(vNode) && document.addEventListener('click', handler);
    },
    update: function update(el, binding) {
      if (validate(binding)) el.__vueClickOutside__.callback = binding.value;
    },
    unbind: function unbind(el, binding, vNode) {
      // Remove Event Listeners
      !isServer(vNode) && document.removeEventListener('click', el.__vueClickOutside__.handler);
      delete el.__vueClickOutside__;
    }
  };

  if (Vue) {
    Vue.directive('click-outside', ClickOutside);
  }
})(Vue);

/***/ })
/******/ ]);