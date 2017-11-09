<template>
	<div class='lisi'>
      <scroll ref='scroll' :data='geDanList' class='parent-scroll'>
      <div>
    		<silder ref='silder' v-if='bannerImage.length!=""'>
          <div v-for='item in bannerImage.data.slider'>
            <a :href='item.linkUrl' class='imgURL'>
              <img v-on:load='onLoad' :src="item.picUrl" />
            </a>
          </div>  
        </silder>
        <div class='recomment-list'>
          <h2 class='list-title'>热门歌单推荐</h2>
          <ul v-if='geDanList.length!=0'>
            <li v-for='item in geDanList' @click='selectItem(item)'>
              <div>
                <img v-lazy="item.imgurl" class='list-img imgURL'>
              </div>
              <div class='diss_right'>
                <h2 v-html='item.dissname' class='diss_top'></h2>
                <div class='diss_bottom'>
                  <p v-html='item.creator.name'></p>
                  <span>播放量:{{item.listennum | click_num}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class='layout_loading' v-if='!geDanList.length'>
        <loading></loading>
      </div>
      </scroll>
      <router-view></router-view>
	</div>
</template>
<script>
import Silder from '../base/silder/silder'
import Scroll from '../base/scroll/scroll'
import {geDan} from '../../js/getRecomment'
import {ERR_OK} from '../../js/jsonp/config'
import Loading from '../base/loading/loading'
import {mapMutations} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      bannerImage: [],
      geDanList: []
    }
  },
  created () {
    this.getData()
    this.get_gedandata()
  },
  methods: {
    getData () {
      this.$http.get('/banner?g_tk=419098148').then((res) => {
        if (res.data.code === ERR_OK) {
          this.bannerImage = res.data
        }
      })
    },
    get_gedandata () {
      geDan().then((res) => {
        if (res.code === ERR_OK) {
          this.geDanList = res.data.list
        }
      })
    },
    selectItem (item) {
      if (item.dissid) {
        console.log(item)
        this.setSongSheet(item)
        this.$router.push({
          path: `/home/${item.dissid}`
        })
      }
    },
    onLoad () {
      if (!this.checkLoad) {
        this.$refs.scroll.refresh()
        this.checkLoad = true
      }
    },
    ...mapMutations({
      setSongSheet: 'SET_SONG_SHEET'
    })
  },
  filters: {
    click_num (value) {
      let num = (value / 10000).toString()
      var re = /([0-9]+.[0-9]{1})[0-9]*/
      num = num.replace(re, '$1')
      return `${num}万`
    }
  },
  components: {
    Silder,
    Scroll,
    Loading
  }
}
</script>
<style>
  .imgURL{
    display: block;
  }
  .list-title{
    background: #212021;
    color:#cecace;
    text-align: center;
    padding:10px 0; 
    font-size: 13px;
    border-bottom: 1px solid rgba(255,40,40,0.7);
  }
  .list-img{
    width:70px;
    height:70px;
  }
  .recomment-list{
    /*position: relative;*/
    /*bottom:55px;*/
  }
  .recomment-list li{
    display: flex;
    padding: 8px 16px; 
    background: #212021;
    display: -webkit-flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid rgba(255,40,40,0.7);
  }
  .diss_right{
     flex-grow:1;
     display: flex;
     flex-flow:column;
     padding:0 0 0 35px;
     justify-content: space-around;
  }
  .diss_top{
    color:#cecace;
    font-size: 13px;
    line-height:20px;
    vertical-align: top;
  }
  .diss_bottom{
    color:#555;
    display: flex;
    font-size: 11px;
    justify-content: space-between;
  }
  .parent-scroll{
    height:100%;
    overflow: hidden;
  }
  .layout_loading{
    margin-top: -60px;
    padding-top: 50%;
  }
</style>