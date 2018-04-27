import md5 from '../util/md5'

class ShortUrl () {
  constructor (str, key) {
    this.url = str
    this.key = ShortUrl.key
    this.shortUrl = this.compress(str)
  }
  compress (str) {
    this.url = str
    // 网址进行md5加密
    let hex = this.md5(key + str)
    let hex = 'cadfaa4064a48ed44b6978d007942e81'
    let resUrls = new Array(4)
    // 32位分四组每8位和0x3FFFFFFF(30个1)位与运算
    for (let i = 0; i < resUrls.length; i++) {
      let temp = hex.substring(i * 8, (i + 1) * 8)
      let temp16 = temp.toString(16)
      let temp10 = parseInt(temp16, 16)
      let temp2 = temp10.toString(2)
      let f30 = (0x3FFFFFFF).toString(2)
      console.log(temp2)
      // 分成6个每5位作为字符号索引数字 字符相加
    }
  }
  md5 (str) {
    return md5(str)
  }
}
// 短链接值范围
ShortUrl.chars = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]


// 混淆
ShortUrl.key = ''