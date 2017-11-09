<template>
	<Scroll :data='dataList' 
			:listenScroll='listenScroll'
			:probeType='probeType'
			class='parent-scroll'
			ref='singerScroll' 
			@scroll='scroll'
	>
		<ul>
			<li v-for='group in dataList' ref='singerGroup'>
				<h3 class='group_title'>{{group.title}}</h3>
				<ul class='singer_list'>
					<li @click='clickSinger(item)' v-for='item in group.items' class='singer_item'>
						<img v-lazy="item.picture" class='singer_picture'>
						<h4 v-html='item.name' class='singer_name'></h4>
					</li>
				</ul>
			</li>
		</ul>
		<div class='singer_right' 
			 @touchstart='onShortcutTouchStart' 
			 @touchmove.stop.prevent='onShortcutTouchMove'>
			<ul class='short_list'>
				<li class='short_word' v-for='(item,index) in shortWord'>
					<p :data-index='index' :class='{current_item:currentIndex === index}'>{{item}}</p>
				</li>
			</ul>
		</div>
		<div class='top_title' ref='topTitle' v-show='topTitle !== ""'>
			<h3 class='group_title'>{{topTitle}}</h3>
		</div>
    <div class='singer_loading' v-if='dataList.length === 0'>
      <loading></loading>
    </div>
	</Scroll>
</template>
<script type='text/ecmascript-6'>
import Scroll from '../scroll/scroll'
import {getData} from '../../../js/dom/dom'
import Loading from '../loading/loading'
const ITEM_HEIGHT = 18
export default {
  props: {
    dataList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diffValue: 0,
      top: 0
    }
  },
  created () {
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  computed: {
    shortWord () {
      return this.dataList.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    topTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.dataList[this.currentIndex] ? this.dataList[this.currentIndex].title : ''
    }
  },
  methods: {
    onShortcutTouchStart (e) {
      let classVal = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.index = classVal
      this.touch.y1 = firstTouch.pageY
      this.scrollY = -this.listHeight[parseInt(classVal)]
      this.$refs.singerScroll.scrollToElement(this.$refs.singerGroup[classVal], 0)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let local = (this.touch.y2 - this.touch.y1) / ITEM_HEIGHT | 0
      let newClassVal = parseInt(this.touch.index) + local
      this.scrollY = -this.listHeight[newClassVal]
      this.$refs.singerScroll.scrollToElement(this.$refs.singerGroup[newClassVal], 800)
    },
    clickSinger (item) {
      this.$emit('clickSinger', item)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    calcListHeight () {
      this.listHeight = []
      const list = this.$refs.singerGroup
      let height = 0
      this.listHeight.push(height)
      for (var i = 0; i < list.length; i++) {
        height += parseInt(list[i].clientHeight)
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    dataList () {
      setTimeout(() => {
        this.calcListHeight()
      }, 20)
    },
    diffValue (newValue) {
      let top = (newValue > 0 && newValue < 17) ? newValue - 17 : 0
      if (this.top === top) {
        return
      }
      this.top = top
      this.$refs.topTitle.style.transform = `translateY(${top}px)`
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (var i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diffValue = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>
<style>
	.singer_item{
		overflow: hidden;
		border-bottom: 1px solid rgba(255,40,40,0.7);
		padding: 8.2px 16px;
		position: relative;
	}
	.singer_list li:last-child{
		border-bottom:none;
	}
	.group_title{
		font-size: 13px;
		font-weight: 100;
		color:#cecace;
		height:13px;
		padding:3px 10px;
		background: #333333;
	}
	.singer_name{
		font-size: 13px;
		font-family: 微软雅黑;
		left:95px;
		top:50%;
		margin-top: -6px;
		position: absolute;
	}
	.singer_picture{
		border-radius: 50%;
		float: left;
		width: 60px;
		height: 60px;
	}
	.parent-scroll{
		height:100%;
		position: relative;
		overflow: hidden;
	}
	.singer_right{
		position: absolute;
		right:0;
		background: rgba(0,0,0,0.4);
		border-radius: 18px;
		z-index: 20;
		top:50%;
		transform:translateY(-55%);
		padding-top:1px;
		padding-bottom: 3px;
		cursor: pointer;
	}
	.top_title{
		position: absolute;
		overflow: hidden;
		z-index: 15;
		width:100%;
		margin-top: -1px;
		display:block;
		top:0px;
		left:0;
		height:30px;
	}
	.short_word p{
		text-align: center;
		font-size: 12px;
		font-weight: 100;
		padding:2px 3px;
	}
	.current_item{
		color: #fec400;
	}
  .singer_loading{
    position: absolute;
    margin-left: -60px;
    left:50%;
    top:50%;
    margin-top: -60px;
  }
</style>