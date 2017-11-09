import {getLyric} from './getSongLyric'
import {Base64} from 'js-base64'
import {ERR_OK} from './jsonp/config'
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getSongLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }
      })
    })
  }
}
export function createSong (item, size) {
  size ? true : size = 300
  return new Song({
    id: item.songid,
    mid: item.songmid,
    singer: singerName(item.singer),
    name: item.songname,
    album: item.albumname,
    duration: item.interval,
    image: `//y.gtimg.cn/music/photo_new/T002R${size}x${size}M000${item.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${item.songid}.m4a?fromtag=46`
  })
}
function singerName (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
