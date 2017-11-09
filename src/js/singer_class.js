export default class Singer {
  constructor ({id, midId, name}, size) {
    this.id = id
    this.name = name
    this.midId = midId
    this.picture = `http://y.gtimg.cn/music/photo_new/T001R${size}x${size}M000${midId}.jpg?max_age=2592000`
  }
}
