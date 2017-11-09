import jsonp from './jsonp/jsonp'
import {commonParams, option} from './jsonp/config'
import axios from 'axios'
export function getRecomment () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg'
  const data = Object.assign({}, commonParams)
  return jsonp(url, data, option)
}

export function geDan () {
  const url = '/gedan_data'
  const data = Object.assign({}, commonParams, {
    format: 'json',
    rnd: Math.random(),
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getDanDetail (disstid) {
  const url = '/geDanDetail'
  const data = Object.assign({}, commonParams, {
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}
