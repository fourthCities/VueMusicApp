<template>
	<div class='topDetail'>
    <music-list :title='title' :backImg='backImg' :songs='song'></music-list>
  </div>
</template>
<script type="text/ecmascript-6" >
import topData from '../../js/topData'
import {mapGetters} from 'vuex'
import {createSong} from '../../js/song_class'
import MusicList from '../base/music-list/musicList'
export default {
  name: 'topDetail',
  created () {
    this.getData()
    window.screen.width > 640 ? this.size = 800 : this.size = 300
  },
  data () {
    return {
      song: [],
      title: '',
      size: ''
    }
  },
  methods: {
    getData () {
      topData(this.topId).then(res => {
        this.title = res.topinfo.ListName
        this.song = this.normalData(res.songlist)
      })
    },
    normalData (list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item.data, this.size))
      })
      return ret
    }
  },
  components: {
    MusicList
  },
  computed: {
    backImg () {
      if (this.song[0]) {
        return this.song[0].image
      } else {
        return
      }
    },
    ...mapGetters([
      'topId'
    ])
  }
}
</script>
<style>
.topDetail{
  width: 100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
}
</style>