import jsonp from './jsonp/jsonp'
import {commonParams, option} from './jsonp/config'

export default function getSmallValue (key) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg'
  let data = Object.assign({}, commonParams, {
    is_xml: 0,
    key: key,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, option)
}
