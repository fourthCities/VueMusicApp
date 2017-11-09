<template>
	<transition name='silde-left'>
		<music-list 
			:songs='songs'
			:title='title'
			:back-img='backImg'
		></music-list>
	</transition>
</template>
<script type='text/ecmascript-6'>
import {mapGetters} from 'vuex'
import {singerDetail} from '../../js/getSingerList'
import {ERR_OK} from '../../js/jsonp/config'
import {createSong} from '../../js/song_class'
import MusicList from '../base/music-list/musicList'
export default {
  data () {
    return {
      songs: [],
      size: 0
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    backImg () {
      return this.singer.picture
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this.getSingerDetail()
    window.screen.width > 640 ? this.size = 800 : this.size = 300
  },
  methods: {
    getSingerDetail () {
      if (!this.singer.midId) {
        this.$router.push({
          path: '/singers'
        })
        return
      }
      singerDetail(this.singer.midId).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this.formatData(res.data.list)
        }
      })
    },
    formatData (list) {
      let ret = []
      list.forEach((item) => {
        let music = item.musicData
        if (music.songid && music.albumid) {
          ret.push(createSong(music, this.size))
        }
      })
      return ret
    }
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