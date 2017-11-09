<template>
  <div>
  	<div ref='parentView' class='parentView'>
  		<div ref='childView' class='childView'>
  			   <slot></slot>
  		</div>
  	</div>
    <div class='dots'></div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from '../../../js/dom/dom'
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.setWidth()
      this.initSilder()
    }, 20)
    window.onresize = () => {
      this.refresh()
      this.setWidth()
    }
    if (this.autoPlay) {
      // this.play()
    }
  },
  methods: {
    setWidth () {
      this.children = this.$refs.childView.children
      let leng = this.children.length
      let viewWidth = this.$refs.parentView.clientWidth
      for (let i = 0; i < leng; i++) {
        let child = this.children[i]
        child.style.width = viewWidth + 'px'
        addClass(child, 'silder-item')
      }
      // if (this.loop) {
      //   leng += 2
      // }
      this.$refs.childView.style.width = viewWidth * leng + 'px'
    },
    initSilder () {
      this.slider = new BScroll(this.$refs.parentView, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: false,
        sanpThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
    },
    refresh () {
      this.slider && this.slider.refresh()
    }
    // play () {
    //   let pageIndex = this.currentPageIndex + 1
    //   if (this.loop) {
    //     pageIndex += 1
    //   }
    //   this.timer = setTimeout(() => {
    //     this.slider.goToPage(pageIndex, 0, 400)
    //   }, this.interval)
    // }
  }
}
</script>
<style>
 .silder-item{
 	float: left;
 }
.silder-item img{
	width:100%;
	display: block;
}
.parentView{
	overflow: hidden;
}
</style>
