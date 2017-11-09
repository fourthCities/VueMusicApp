<template>
    <transition name='silde-left'>
  		<music-list
        :songs='song'
        :title='title'
        :back-img='backImg'
      ></music-list>
    </transition>
</template>
<script>
import MusicList from '../base/music-list/musicList.vue'
import {getDanDetail} from '../../js/getRecomment.js'
import {mapGetters} from 'vuex'
import {createSong} from '../../js/song_class.js'
export default {
  name: 'playList',
  data () {
    return {
      song: [],
      list: {},
      size: 0
    }
  },
  created () {
    this.goback()
    window.screen.width > 640 ? this.size = 800 : this.size = 300
    this._getSongSheetDetail(this.songSheet.dissid)
  },
  methods: {
    _getSongSheetDetail (id) {
      getDanDetail(id).then(res => {
        this.list = res.data.cdlist[0]
        this.song = this.normalSong(this.list.songlist)
      })
    },
    goback () {
      if (!this.songSheet.dissid) {
        this.$router.push('/home')
        return
      }
    },
    normalSong (list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item, this.size))
      })
      return ret
    }
  },
  computed: {
    title () {
      return this.list.dissname
    },
    backImg () {
      return this.list.logo
    },
    ...mapGetters([
      'songSheet'
    ])
  },
  components: {
    MusicList
  }
}
</script>
<style>
.silde-left-enter-active,.silde-left-leave-active{
  transition: all 0.3s;
}
.silde-left-enter,.silde-left-leave-to{
  transform: translateX(100%);
}
</style>