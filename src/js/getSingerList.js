import jsonp from './jsonp/jsonp'
import {commonParams, option} from './jsonp/config'
export function getSingerList (pagenum) {
  let num = pagenum || 1
  const url = 'https://shc.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: num,
    g_tk: 323158938
  })
  return jsonp(url, data, option)
}

export function singerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1697061042,
    hostUin: 0,
    inCharset: 'utf8',
    singermid: singerId,
    platform: 'yqq',
    outCharset: 'utf-8',
    notice: 0,
    needNewCode: 0,
    begin: 0,
    songstatus: 1,
    num: 100,
    order: 'listen'
  })
  return jsonp(url, data, option)
}
