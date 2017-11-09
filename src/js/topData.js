import axios from 'axios'
export default function topData (topid) {
  let url = '/topData'
  let data = {
    g_tk: 1263099449,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: topid,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  }
  return axios.get(url, {
    params: data
  }).then(res => {
    return new Promise((resolve, reject) => {
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
}
