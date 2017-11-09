<template>
	<div class='process-parent' ref='processParent' @click='processClick'>
		<div class='bg-process' ref='bgProcess'></div>
		<div class='dot' ref='dot' @touchstart ='processTouchStart' @touchmove = 'processMove' @touchend ='processEnd'
		></div>
	</div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        len: 0
      }
    },
    created () {
      this.touchData = {}
    },
    methods: {
      processClick (e) {
        var screenLeft = (window.screen.width - this.$refs.processParent.clientWidth) / 2
        var pos = e.clientX - screenLeft < 0 ? 0 : e.clientX - screenLeft
        this.$refs.bgProcess.style.width = `${pos}px`
        this.$refs.dot.style['transform'] = `translate3d(${pos}px,0,0)`
        this.sendPer()
      },
      processTouchStart (e) {
        this.touchData.initiated = true
        this.touchData.startX = e.touches[0].pageX
        this.touchData.left = this.$refs.bgProcess.clientWidth
      },
      processMove (e) {
        if (!this.touchData.initiated) {
          return
        }
        var diffDicent = e.touches[0].pageX - this.touchData.startX
        var numtwo = Math.min(this.$refs.processParent.clientWidth - 15, Math.max(0, this.touchData.left + diffDicent))
        this.$refs.bgProcess.style.width = `${numtwo}px`
        this.$refs.dot.style['transform'] = `translate3d(${numtwo}px,0,0)`
      },
      processEnd () {
        this.touchData.initiated = false
        this.sendPer()
      },
      sendPer () {
        let per = this.$refs.processParent.clientWidth - 15
        let canshu = this.$refs.bgProcess.clientWidth / per
        this.$emit('processChange', canshu)
      }
    },
    watch: {
      percent (newValue, oldValue) {
        if (newValue >= 0 && !this.touchData.initiated) {
          let per = this.$refs.processParent.clientWidth - 15
          this.len = per * newValue
          this.$refs.bgProcess.style.width = `${this.len}px`
          this.$refs.dot.style['transform'] = `translate3d(${this.len}px,0,0)`
        }
      }
    }
  }
</script>
<style type="text/css">
.process-parent,.bg-process{
	position: absolute;
	top:0;
	left:0;
	height: 100%;
	border-radius: 3px;
 }
.process-parent{
	width: 100%;
	background: #7a7272;
 }
.bg-process{
	width: 0;
	background: #d33a31;
 }
.dot{
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background: #ffffff;
	position: absolute;
	left:0;
	top:-6px;
 }
</style>