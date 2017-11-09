<template>
	<div class='play_control'>
		<transition name='normal'>
			<div class='normalPlay' v-show='fullScreen' ref='normalPlay'>
				<div class='bgFilter'>
					<img :src="currentSong.image">
				</div>
				<div class='top'>
					<div class='needsclick goback'  @click.prevent='packUp'>
						<i class='iconfont icon-down-trangle'></i>
					</div>
					<div class='currentTitle' >
						<h2 v-html='currentSong.name'></h2>
						<p v-html='currentSong.singer' class='currentSong-singer-name'></p>
					</div>
				</div>
				<div class='middle' @click='showLyric=!showLyric'>
					<div ref='cdWrapper' class="cd_layOut" v-show='!showLyric'>
						<img :src="currentSong.image" :class='isRotate'>
					</div>
					<div class='Lyric-wrapper'  v-show='showLyric'>
						<scroll class='Lyric-layout' :data='currentLyric && currentLyric.lines' ref='lyricScroll'>
							<div v-if="currentLyric">
								<p :class="{'currentLine':index===currentLineNum}" v-for='(item, index) in currentLyric.lines' ref='LyricTxt'>{{item.txt}}</p>
							</div>
						</scroll>

					</div>
				</div>
				<div class='bottom'>
					<div class='processBar'>
						<span class='finishTime'>{{finishTime}}</span>
						<div class='process-wraper'>
							<proce-bar :percent='timeDiffer' @processChange ='change'></proce-bar>
						</div>
						<span class='totalTime'>{{calcTime(currentSong.duration)}}</span>
					</div>
					<div class='button_group'>
						<div>
							<i class='iconfont icon-pause' @click='modeChange'></i>
							<p>{{qiehuan}}</p>
						</div>
						<div>
							<i class='iconfont icon-pause' @click='perSong'></i>
							<p>上一首</p>
						</div>
						<div>
							<i class='iconfont icon-pause' @click='changePlaying'></i>
							<p>暂停</p>
						</div>
						<div>
							<i class='iconfont icon-pause' @click='nextSong'></i>
							<p>下一首</p>
						</div>
						<div>
							<i class='iconfont icon-pause'></i>
							<p>喜欢</p>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name='mini'>
			<div class='miniPlay' v-show='!fullScreen' @click='pop'>
				<div class='miniPlay-left'>
					<div class='cdImg'>
						<img :src="currentSong.image" :class='isRotate'>
					</div>
					<div class='songName'>
						<h2 v-html='currentSong.name'></h2>
						<p v-html='currentSong.singer'></p>
					</div>
				</div>
				<div class='iconButton'>
					<div>
						<i class='iconfont icon-pause' @click.stop='changePlaying'></i>
						<p>暂停</p>
					</div>
					<div>
						<i class='iconfont icon-pause'></i>
						<p>模换</p>
					</div>
				</div>
			</div>
		</transition>
		<audio :src='currentSong.url' ref='audio' @canplay='ifReady' @ended='end' @error='ifReady' @timeupdate='upTime'></audio>
	</div>
</template>
<script type='text/-ecmascript-6'>
import {mapGetters, mapMutations} from 'vuex'
import proceBar from '../base/process-bar' 
import {Mode} from '../../js/mode_config'
import {shuiji} from '../../js/shuiji.js'
import animations from 'create-keyframe-animation'
import Scroll from '../base/scroll/scroll'
import Lyric from 'lyric-parser'
export default {
  data () {
    return {
      songReady: false,
      finishTime: 0,
      currenttime: 0,
      qiehuan: '顺序',
      currentLyric: [],
      showLyric: false,
      currentLineNum: 0
    }
  },
  // created() {
  // 	setTimeout(() => {
  //     console.log(this.$refs.audio.currentTime)
  //   }, 20)
  // },
  methods:{
    modeChange () {
     const mode = (this.mode + 1) % 3
     console.log(mode)
     this.setMode(mode)
     let list = null
      if (mode === Mode.random) {
        list = shuiji(this.playList)
      }else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
  	},
  	change (newVal) {
  	  this.$refs.audio.currentTime = newVal * this.currentSong.duration
  	},
  	changePlaying () {
  	  setTimeout(() => {
  	    this.playing? this.setPlayingState(false) : this.setPlayingState(true)
  	  })
  	},
  	ifReady () {
  	  this.songReady = true
  	},
    packUp () {
      this.setFullScreen(false)
    },
    pop () {
      this.setFullScreen(true)
    },
    upTime () {
      this.currenttime = this.$refs.audio.currentTime
      this.finishTime = this.calcTime(this.$refs.audio.currentTime)
    },
    calcTime (second) {
      let intNum = Math.floor(second)
      let minutes = this.formatTime(Math.floor(intNum / 60))
      let seconds = this.formatTime(Math.floor(second) % 60)
      return `${minutes}:${seconds}`
    },
    formatTime (num) {
      if (num < 10) {
        return `0${num}`
      }
      return num
    },
    getLyric() {
      this.currentSong.getSongLyric().then((res) => {
      	this.currentLyric = new Lyric(res)
      	if (this.playing) {
      	  this.currentLyric.play()
      	}
      })
    },
    callBack({lineNum, txt}) {
      this.currentLineNum = lineNum
      // if(lineNum > 5) {
      // 	let lineEl = this.$refs.LyricTxt[lineNum - 5]
      // 	this.$refs.lyricScroll.scrollToElement(lineEl, 1000)
      // } else {
      // 	this.$refs.lyricScroll.scrollToElement(0, 0, 1000)
      // }
    },
    perSong () {
      if (this.songReady === false) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
      this.songReady = false
    },
    end () {
      if (this.mode === Mode.loop) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlayingState(true)
        return
      }
      this.nextSong()
    },
    nextSong () {
      if (this.songReady === false) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
      this.songReady = false
    },
    enter (el, done) {
      // const {x, y, scale} = this._getPosAndScale()
      // let animation = {
      //   0: {transform: `translate3d(0,100%,0) scale(${scale})`},
      //   60: {transform: `translate3d(0,0,0) scale(1.1)`},
      //   100: {transform: `translate3d(0,0,0) scale(1)`}
      // }
      // let animation = {
      //   0: {transform: 'translate3d(0,100%,0)'},
      //   100: {transform: 'translate3d(0,0,0)'}
      // }
      // animations.registerAnimation({
      //   name: 'move',
      //   animation,
      //   presets: {
      //     duration: 200,
      //     easing: 'linear'
      //   }
      // })
        // animations.runAnimation(this.$refs.normalPlay, 'move', done)
    },
    afterEnter () {
      // animations.unregisterAnimation('move')
      // this.$refs.normalPlay.style.animation = ''
    },
    leave(el, done) {
      // this.$refs.normalPlay.style.transition = 'all 0.2s'
      // const {x, y, scale} = this._getPosAndScale()
      // this.$refs.normalPlay.style['transform'] = 'translate3d(${0}px,${100%},0)'
      // this.$refs.normalPlay.addEventListener('transitionend', done)
    },
    afterLeave() {
      // this.$refs.normalPlay.style.transition = ''
      // this.$refs.normalPlay.style['transform'] = ''
    },
    _getPosAndScale () {
      // const targetWidth = 46
      // const paddingLeft = 38
      // const paddingBottom = 28
      // // const paddingTop = 5
      // const width = window.innerWidth * 0.65
      // const scale = targetWidth / width
      // const x = -(window.innerWidth / 2 - paddingLeft)
      // // const z= window.innerHeight -  - paddingTop
      // const y = window.innerHeight  - width / 2 - paddingBottom
      // return {
      //   x,
      //   y,
      //   scale
      // }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setMode: 'SET_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  },
  computed: {
  	isRotate () {
  	  return this.playing? 'play': 'play pause'
  	},
    timeDiffer () {
	  return this.currenttime / this.currentSong.duration
    },
   ...mapGetters([
      'fullScreen',
      'currentSong',
      'playList',
      'playing',
      'playLength',
      'mode',
      'sequenceList',
      'currentIndex'
    ])
  },
  watch: {
    playing (newVal) {
      setTimeout(() => {
        newVal ? this.$refs.audio.play() : this.$refs.audio.pause()
      }, 20)  
    },
    currentSong (newVal, oldValue){
      if (newVal.id === oldValue.id) {
        return
      }
      setTimeout(() => {
      	this.getLyric()
        this.$refs.audio.play()
      }, 20)
    }
  },
  components: {
  	proceBar,
  	Scroll
  }
}
</script>
<style>
	.currentLine{
		font-size: 16px;
		color: #fff;
	}
	.middle {
		width: 100%;
		align-self:center;
		flex-grow:1;
		display: flex;
		position: relative;
		flex-direction:column;
		justify-content: space-between;
		border-top: 1px solid rgba(204,204,204,0.5);
	}
	.Lyric-layout {
		color: #ccc;
		font-size: 14px;
		height:100%;
		width:100%;
		margin: 0px 0px; 
		margin-top: 30px; 
		overflow: hidden;
		box-sizing: border-box;
		font-weight: 100;
		text-align: center;
	}
	.Lyric-layout p{
		margin-bottom: 20px;
		padding-left: 40px;
		padding-right: 40px;
	}
	.Lyric-wrapper{
		position: absolute;
		left:50%;
		margin-top: -30px; 
		transform: translateX(-50%);
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		height: 100%;
	}
	.play_control{
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index:40;
	}
	.normalPlay{
		width:100%;
		height:100%;
		top:0;
		left:0;
		display: flex;
		flex-direction:column;
		justify-content: space-between;
		position: fixed;
		background: #212021;
	 }
	 .miniPlay{
		height: 55px;
		width:100%;
		background: #333333;
		display: flex;
		justify-content: space-between;
	 }
	.bgFilter{
		width: 100%;
		height:100%;
		opacity: 0.6;
		filter: grayscale(40%);
		position: absolute;
		z-index: -1;
	 }
	.bgFilter img{
		width: 150%;
		height: 100%;
		transform: translateX(-18%);
		filter: blur(15px);
	 }
	.top{
	 	display: flex;
	 	min-height: 55px;
	 }
	.goback,.currentTitle{
	    line-height: 40px;
	    color: #fec400;
	  }
	.goback{
		width: 20px;
		padding-left: 20px;
		margin-right: 20px;
	 }
	.currentSong-singer-name{
		height: 15px;
		line-height: 15px;
		font-size: 11px;
		margin-top: -5px;
	 } 
	.cd_layOut{
	 	background: rgba(0, 0, 0, 1);
	 	border-radius: 50%;
	 	width: 65%;
	 	height: 0;
	 	align-self:center;
	 	margin-top:50%;
	 	padding-bottom: 65%;
	 	margin: auto;
	 	border: 15px solid rgba(255, 255, 255, 0.1);
	 }
	.cd_layOut img{
		border-radius: 50%;
		width:100%;
	 }
	.processBar{
		width: 88%;
		margin:auto;
		display: flex;
		font-size: 11px;
		font-weight: 100;
		color:#fff;
		height:16px;
		justify-content: space-between;
	}
	.processBar span{
		width:35px;
		text-align: center;
	}
	.processBar>div{
		flex:1;
		height: 2px;
		position: relative;
		margin-top:3px;
	}
	.button_group{
		display: flex;
		margin:25px;
		text-align: center;
		font-weight:300;
		color:#fec400;
		justify-content: space-around;
	 }
	.button_group p{
		margin-top:3px; 
	 }
	.normal-enter-active, .normal-leave-active{
		transition: all 0.3s;
	}
	 .normal-enter, .normal-leave-to{
		transform: translate3d(0, 5%, 0);
		opacity: 0;
	}
	 .miniPlay-left,.iconButton{
	 	height: 100%;
	 }
	 .miniPlay>div{
		overflow: hidden;
	 }
	 .miniPlay-left>div, .iconButton>div{
	 	float:left;
	 }
	.miniPlay img{
		width:45px;
		height:45px;
		border-radius: 50%;
		margin:5px 15px;
	 }
	.mini-enter-active,.mini-leave-active{
	  transition: all 0.3s;
	 }
	.mini-enter, .mini-leave-to{
	  opacity: 0;
	 }
	.play{
		animation: rotate 15s infinite linear;
	 }
	.pause{
		animation-play-state: paused;
	 }
	@keyframes rotate {
	 	0%{transform: rotate(0deg);}
	 	100%{transform: rotate(360deg);}
	 }
</style>