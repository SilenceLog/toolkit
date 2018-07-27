class OSS () {
  constructor (options) {
    this.space = options.space || 'cache'
  }
  // space file
  upload (options) {
    if (!options || !options.file) return
    upload(options)
  }
  uploadAsync (options) {
    return new Promise (function(resolve,reject){
      options.sccuessFn = function (data) {
        resolve(data)
      }
      options.failureFn = function (err) {
        reject(err)
      }
      upload(options)
    }
  }
}

function upload (options) {
  if (!options || !options.file) return
  request({
    url: '/api/system/apply_oss_object',
    params: {
      type: options.space || 'cache',
      filename: options.file.name,
      filesize: options.file.size,
      filetype: options.file.type,
      busi_type: 'PERSON_DISK',
      parent_id: 7777
    }
  }, function (data) {
    let creds = data.credentials
    let client = new OSS.Wrapper({
      region: data.region,
      accessKeyId: creds.AccessKeyId,
      accessKeySecret: creds.AccessKeySecret,
      stsToken: creds.SecurityToken,
      bucket: data.bucket
    })
    client.multipartUpload(data.ossid, conf.file).then(function (r1) {
      return client.get(data.ossid)
    }).then(function (r2) {
      if (options.sccuessFn) {
        options.sccuessFn(data)
      }
    }).catch(function (err) {
      console.log('err', err)
      if (options.failureFn) {
        options.failureFn(err)
      }
    })
  }, function (err) {
    if (options.failureFn) {
      options.failureFn(err)
    }
  })
}

function request (config, sccuessFn, failureFn) {
    let method = 'get'
    let url = ''
    if (typeof config === 'object') {
        config.method && (method = config.method)
        config.url && (url = config.url)
    } else {
        url = config
    }

    let xhr = null
    method = method.toUpperCase()

    let paramArr = []
    let postData = null

    if (config.params) {
        if ((/POST/i).test(method)) {
            postData = JSON.stringify(config.params)
        } else {
            for (let key in config.params) {
                paramArr.push(key + '=' + config.params[key])
            }
            url += '?' + paramArr.join('&')
        }
    }

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.open(method, url, true)
    if (window.XMLHttpRequest) {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    } else {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    xhr.send(postData)
    xhr.onreadystatechange = function(sccuessFn, failureFn) {
      if (xhr.readyState == 4) {
          if (xhr.status == 200) {
              if (typeof sccuessFn === 'function') {
                var result = null
                if (typeof xhr.responseText === 'string') {
                  result = JSON.parse(xhr.responseText)
                } else {
                  result = xhr.responseText
                }
                sccuessFn.bind(this, result)()
              }
          } else {
              if (typeof failureFn === 'function') {
                  failureFn()
              } else {
                  alert(xhr.status)
              }
          }
      }
    }.bind(this, sccuessFn, failureFn)
}
