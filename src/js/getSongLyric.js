import {commonParams} from './jsonp/config'
import axios from 'axios'
export function getLyric (songmid) {
  const url = '/getLyric'
  const data = Object.assign({}, commonParams, {
    songmid: songmid,
    needNewCode: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    hostUin: 0,
    pcachetime: +new Date(),
    platform: 'yqq'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return new Promise((resolve, reject) => {
      var ret = res.data
      if (typeof ret === 'string') {
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
          resolve(ret)
        }
      }
    })
  })
}
