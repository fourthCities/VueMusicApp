<template>
    <scroll class='scroll-wrapper' 
            :data='resultlist' 
            :pullup='pullup'
            @scrollToEnd='searchMore'
            ref='scrollR'
            :beforeScroll='beforeScroll'
            @beforeScroll="listScroll"
    >
      <div>
  			<div v-for='(item,index) in resultlist' class='songlist' @click='toNextPage(item)'>
  				<span class='shouldicon' v-if='item.type !== 1' v-html = 'itemType(item)'></span><img class='singerPhoto' v-if='item.type === 1' :src='item.zhida_singer.singerPic'><span v-html ='getName(item)'></span>
        </div>
        <div>
          <p v-if='!hasMore' class='noMore'>就只有这么多，亲！</p>
        </div>
      </div>
    </scroll>
</template>
<script type="text/javascript">
import searchResult from '../../js/searchHotKey'
import {createSong} from '../../js/song_class'
import Scroll from '../base/scroll/scroll'
import Loading from '../base/loading/loading'
import Singer from '../../js/singer_class'
import {mapMutations, mapActions} from 'vuex'
const perpage = 30
export default {
  props: {
    ifShowSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      defalut: ''
    }
  },
  name: 'resultList',
  data () {
    return {
      page: 1,
      size: 0,
      pullup: true,
      resultlist: [],
      hasMore: true,
      beforeScroll: true
    }
  },
  created () {
    window.screen.width > 640 ? this.size = 800 : this.size = 300
  },
  methods: {
    toNextPage (item) {
      // 点击的是歌手
      if (item.type === 1) {
        this.setSinger(new Singer({
          id: item.zhida_singer.singerID,
          midId: item.zhida_singer.singerMID,
          name: item.zhida_singer.singerName
        }, this.size))
        this.$router.push(`/search/singerDetail/${item.zhida_singer.singerMID}`)
      }
      // 点击的是歌曲
      if (item.id && item.mid) {
        this.selectSearch(item)
      }
      // 点击的是专辑  功能待完善
      if (item.type === 2) {}
    },
    getData () {
      this.hasMore = true
      this.page = 1
      this.$refs.scrollR.scrollTo(0, 0)
      searchResult(this.query, this.page, this.ifShowSinger, perpage).then(res => {
        this.resultlist = this.normalData(res.data)
        this.checkHasMore(res.data)
      })
    },
    listScroll () {
      this.$emit('listScroll')
    },
    checkHasMore (list) {
      const song = list.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      searchResult(this.query, this.page, this.ifShowSinger, perpage).then(res => {
        let ret = this.normalData(res.data)
        if (ret[0].type === 1) {
          ret = ret.slice(1)
        }
        this.resultlist = this.resultlist.concat(ret)
        this.checkHasMore(res.data)
      })
    },
    itemType (item) {
      return item.type === 1 ? '歌手' : item.type === 2 ? '专辑' : '歌曲'
    },
    getName (item) {
      return item.type === 1 ? item.zhida_singer.singerName : item.type === 2 ? `${item.zhida_album.albumName}-${item.zhida_album.singerName}` : `${item.name}-${item.singer}`
    },
    normalData (data) {
      let ret = []
      if (data.zhida && data.zhida.type > 0) {
        ret.push({...data.zhida})
      }
      if (data.song && data.song.list.length > 0) {
        ret = ret.concat(this.normalSong(data.song.list))
      }
      return ret
    },
    normalSong (list) {
      let ret = []
      list.forEach(item => {
        if (item.songid) {
          ret.push(createSong(item, this.size))
        }
      })
      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'selectSearch'
    ])
  },
  watch: {
    query (newValue) {
      if (newValue === '') {
        return
      }
      this.getData(newValue)
      this.$emit('saveHistory', newValue)
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>
<style type="text/css">
	.songlist{
		color: #cecece;
    font-size: 16px;
/*    background: #333333;*/
/*border-bottom:1px solid #f00;*/
  font-family: "黑体";
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
    font-weight: 100;
	}
  .scroll-wrapper{
    height: 100%;
  }
  .noMore {
    text-align: center;
    color:#ffcd32;
    font-weight: 100;
    font-size: 12px;
    letter-spacing: 3px;
  }
  .singerPhoto {
    border-radius: 50%;
    width:40px;
    vertical-align: middle;
    margin-right: 23px;
    margin-bottom: 8px;
  }
  .shouldicon{
    margin-right: 20px;
    padding-bottom: 18px;
    padding-left: 3px;
    width: 40px;
    letter-spacing: 3px;
    display: inline-block;
  }
</style>