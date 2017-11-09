import axios from 'axios'
export default function rankData () {
  let url = '/rankData'
  let data = {
    g_tk: 5381,
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
        resolve(res.data.data.topList)
      } else {
        reject(res)
      }
    })
  })
}
