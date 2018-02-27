import { isDOMElement } from './Type.js'

class Dom () {
  constructor (el) {
    this.el = isDOMElement(el) ? el : selector(el)
    this.els = []
  }
  selector (el) {
    return document.getElementById(el)
  }
  show () {
    this.el.style.display = ''
  }
  hide () {
    this.el.style.display = 'none'
  }
  html (txt) {
    if (arguments.length === 0) {
      return this.el.innerHTML
    } else {
      this.el.innerHTML = txt
    }
  }
  css (key, value) {
    if (value !== undefined) {
      this.el.style[key] = value
    } else if (typeof key === 'object') {
      for (const k in key) {
        this.el.style[k] = key[k]
      }
    } else {
      return this.el.style[key]
    }
  }
  hasClass (classStr) {
    const arr = this.el.className.split(/\s+/)
    return arr.indexOf(classStr) > -1
  }
  addClass (classStr) {
    if (!this.hasClass(classStr)) this.el.className += ' ' + classStr
  }
  removeClass (classStr) {
    if (this.hasClass(classStr)) {
      const reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
      this.el.className = this.el.className.replace(reg, '')
    }
  }
  toggleClass (classStr) {
    if (this.hasClass(classStr)) {
      this.removeClass(classStr)
    } else {
      this.addClass(classStr)
    }
  }
  children () {
    
  }
  paretn () {

  }
  siblings () {

  }
} 

var EventUtil = {
  // 添加事件监听
  add: function (element, type, callback) {
    if (element.addEventListener) {
      element.addEventListener(this.compatible(type), callback, false)
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, callback)
    } else {
      element['on' + type] = callback
    }
  },
  // 移除事件监听
  remove: function(element, type, callback) {
    if (element.removeEventListener) {
      element.removeEventListener(type, callback, false)
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, callback)
    } else {
      element['on' + type] = null;
    }
  },
  // 跨浏览器获取 event 对象
  getEvent: function(event) {
    return event ? event : window.event
  },
  // 跨浏览器获取 target 属性
  getTarget: function(event) {
    return event.target || event.srcElement
  },
  // 阻止事件的默认行为
  preventDefault: function(event){
    if (event.preventDefault) {
      event.preventDefault ()
    } else {
      event.returnValue = false
    }
  },
  // 阻止事件流或使用 cancelBubble
  stopPropagation: function() {
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  },
  // 不同浏览器事件名称兼容
  compatible: function (type) {
    let map = {
      mousewheel: function () {
        let name
        if (/Firefox/i.test(navigator.userAgent)) {
          name = 'DOMMouseScroll'
        } else {
          name = 'mousewheel'
        }
        return name
      }
    }
    return map[type] ? map[type] : type
  }
}
