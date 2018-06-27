// 监测webp支持情况，如果支持为html标签添加属性：data-webp=1
(function () {
  var webp = new Image()
  webp.onload = webp.onerror = function () {
    webp.height === 2 && document.documentElement.setAttribute('data-webp', 1)
    webp.onload = webp.onerror = null
    webp = null
  }
  webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
})()
