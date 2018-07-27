const data = {
  // 邮箱验证返回值
  REQUEST_RESULT: [
    {
      key: 'success',
      value: 'success',
      code: 200,
      text: '成功'
    },
    {
      key: 'bad_gateway',
      value: 'bad_gateway',
      code: 502,
      text: '错误网关'
    },
    {
      key: 'overfrequency',
      value: 'overfrequency',
      code: 503,
      text: '超频'
    },
    {
      key: 'timeout',
      value: 'timeout',
      code: 504,
      text: '超时'
    },
    {
      key: 'arrearage',
      value: 'arrearage',
      code: 402,
      text: '欠费'
    },
    {
      key: 'forbidden',
      value: 'forbidden',
      code: 403,
      text: '禁用'
    },
    {
      key: 'permission_denied',
      value: 'permission_denied',
      code: 401,
      text: '身份验证失败'
    }
  ],
  // 邮箱验证状态
  MAIL_VERIFICATION_STATUS: [
    {
      key: 'valid',
      value: 'valid',
      // code: 250,
      text: '有效'
    },
    {
      key: 'invalid',
      value: 'invalid',
      // code: 500,
      text: '无效'
    },
    {
      key: 'unknown',
      value: 'unknown',
      // code: 404,
      text: '未知'
    },
    {
      key: 'format_error',
      value: 'format_error',
      // code: 416,
      text: '格式错误'
    }
  ]
}

function filterData(arr, fn) {
  return arr.reduce((s, v, i) => {
    if (fn.call(this, v)) s.push(v)
    return s
  }, [])
}

// class Constants {
//   constructor () {
//   }
//   exchangeRate () {
//   }
// }

// function Constants () {
//   this.getArray = function (key, fn) {
//     let items = fn && typeof fn === 'function' ? filterData(data[key], fn) : (data[key] || [])
//     return items
//   }
//   this.getMap = function (key, symbol='key', fn) {
//     let items = []
//     if (typeof symbol === 'string') {
//       items = this.getArray(key, fn).map((v, i) => {
//         return [v[symbol], v]
//       })
//     } else if (typeof symbol === 'function') {
//       items = this.getArray(key, fn).map((v, i) => {
//         return [symbol.call(this, v), v]
//       })
//     }
//     let map = new Map(items)
//     return map
//   }
//   this.getObject = function (key, symbol='key', fn) {
//     let items = []
//     if (typeof symbol === 'string') {
//       console.log('this', this)
//       items = this.getArray(key, fn).map((v, i) => {
//         return [v[symbol], v]
//       })
//     } else if (typeof symbol === 'function') {
//       items = this.getArray(key, fn).map((v, i) => {
//         return [symbol.call(this, v), v]
//       })
//     }
//     let map = new Map(items)
//     return map
//   }
// }

export default {
  getArray (key, fn) {
    let items = fn && typeof fn === 'function' ? filterData(data[key], fn) : (data[key] || [])
    return items
  },
  getMap (key, symbol='key', fn) {
    let items = []
    if (typeof symbol === 'string') {
      items = this.getArray(key, fn).map((v, i) => {
        return [v[symbol], v]
      })
    } else if (typeof symbol === 'function') {
      items = this.getArray(key, fn).map((v, i) => {
        return [symbol.call(this, v), v]
      })
    }
    let map = new Map(items)
    return map
  },
  getObject (key, symbol='key', fn) {
    let o = {}
    if (typeof symbol === 'string') {
      o = this.getArray(key, fn).reduce((s, v, i) => {
        s[v[symbol]] = v
        return s
      }, {})
    } else if (typeof symbol === 'function') {
      o = this.getArray(key, fn).map((v, i) => {
        s[symbol.call(this, v)] = v
        return s
      })
    }
    return o
  }
}
