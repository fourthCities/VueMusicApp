import jsonp from './jsonp/jsonp'
import {commonParams, option} from './jsonp/config'

export default function searchResult (hotKey, page, hasSinger, perpage) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  let data = Object.assign({}, commonParams, {
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida: hasSinger ? 1 : 0,
    lossless: 0,
    flag_qc: 0,
    p: page,
    n: perpage,
    perpage,
    w: hotKey,
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
