import orginJsonp from 'jsonp'

export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parmes(data)
  return new Promise((resolve, reject) => {
    orginJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function parmes (data) {
  let url
  for (let k in data) {
    let value = data[k] !== 'undefiend' ? data[k] : ''
    if (url) {
      url += `&${k}=${encodeURIComponent(value)}`
    } else {
      url = `&${k}=${encodeURIComponent(value)}`
    }
  }
  return url ? url.substring(1) : ''
}
