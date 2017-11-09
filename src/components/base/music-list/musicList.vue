<template>
	<div class='singer_detail'>
		<div class='needsclick back'  @click.prevent='back123'>
			<i class='iconfont icon-back'></i>
		</div>
		<div class='title'>
			<h2 v-html='title'></h2>
		</div>
    <div>
  		<div class='backImg' :style='bgStyle' ref='bgImage'>
        <div class='randomButton' ref='randomButton' @click='random'>
          <i class='iconfont icon-music'></i>
          <p>全部随机播放</p>
        </div>
        <div class='filter'></div>  
      </div>
    </div>
		<div class="bg-layer" ref="layer"></div>
		<Scroll
       :data='songs'
       @scroll='scroll'
       :probe-type='probeType'
       :listen-scroll='listenScroll'
       class='list-view' 
       ref='songsScroll'>
      <song-item :dataList='songs' @clickSong='clickSong'></song-item>
      <div v-if='songs.length === 0' class='loading'>
        <loading></loading>
      </div>
		</Scroll>
	</div>
</template>
<script type='text/ecmascript-6'>
import {mapMutations, mapGetters, mapActions} from 'vuex'
import Scroll from '../scroll/scroll'
import songItem from '../song-item'
const REAEVER_HEIGHT = 40
import Loading from '../loading/loading'
export default {
  props: {
    title: {
      type: String,
      defalut: ''
    },
    backImg: {
      type: String,
      defalut: ''
    },
    songs: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      scrollY: 0,
      imageHeight: 0
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.refershHeight()
  },
  components: {
    Scroll,
    Loading,
    songItem
  },
  methods: {
    clickSong (index, song) {
      this.selectPlay({
        list: this.songs,
        index: index
      })
    },
    refershHeight () {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.maxHeight = -this.imageHeight + REAEVER_HEIGHT
      this.$refs.songsScroll.$el.style.top = `${this.imageHeight}px`
      this.$refs.layer.style.top = `${this.imageHeight}px`
    },
    random () {
      this.allRandom({
        list: this.songs
      })
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    back123 () {
      this.$router.back()
    },
    ...mapMutations({
      unshiftSong: 'UNSHIFT_SONGS_PLAYLIST'
    }),
    ...mapActions([
      'selectPlay',
      'allRandom'
    ])
  },
  computed: {
    ...mapGetters([
      'mode',
      'currentIndex',
      'playing'
    ]),
    bgStyle () {
      return `background-image:url(${this.backImg})`
    }
  },
  watch: {
    scrollY (newValue) {
      let zIndex = 0
      let scale = 1
      let translateY = Math.max(this.maxHeight, newValue)
      const percent = Math.abs(newValue / this.imageHeight)
      if (newValue > 0) {
        scale = 1 + percent
        this.$refs.bgImage.style['transform'] = `scale(${scale})`
      }
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      if (newValue < this.maxHeight) {
        zIndex = 5
        this.$refs.bgImage.style.height = `${REAEVER_HEIGHT}px`
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.randomButton.style.display = 'none'
      } else {
        this.$refs.bgImage.style.height = 0
        this.$refs.randomButton.style.display = 'block'
        this.$refs.bgImage.style.paddingTop = '75%'
      }
      this.$refs.bgImage.style.zIndex = zIndex
    }
  }
}
</script>
<style>
  .back,.title{
    position: absolute;
    z-index: 10;
    width: 100%;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 2px;
    text-align: center;
    color:#fec400;
  }
  .back{
    left:0px;
    height:40px;
    width: 20px;
    z-index: 11;
    display: block;
    padding-left: 20px;
  }
	.singer_detail{
		background: #212021;
		position: fixed;
		top:0;
		left:0;
    bottom: 55px;
		/*height:100%;*/
		width:100%;
		z-index:20;
	}
  .filter{
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top:0;
    left:0;
  }
	.backImg{
		width: 100%;
    height: 0;
    padding-top: 75%;
    transform-origin: top;
    background-size: cover;
		position: absolute;
		top:0;
		left:0;
	}
  .list-view{
      width:100%;
      top: 0;
      bottom: 55px;
  		position: fixed;
  	}
  .bg-layer{
      position: relative;
      top:0;
      bottom: 0;
      height: 100%;
      background:#212021;
    }
  .loading{
    position: absolute;
    top:50%;
    left:50%;
    transform: translateY(-80%);
    margin-left: -60px;
  }
  .randomButton{
    position: absolute;
    bottom:10%;
    left:50%;
    overflow: hidden;
    transform: translateX(-50%);
    border:1px solid #fec400;
    width:120px;
    padding:1px 8px;
    border-radius: 15px;
    z-index: 3;
  }
  .randomButton p{
    float: right;
    font-size: 14px;
    margin-right: 3px;
    line-height: 20px;
  }
</style>