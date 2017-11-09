<template>
	<div class='search'>
    <!-- 搜索框 -->
		<search-box @changeQuery='getQuery' @selectSmall='selectItem' :smallBoxList='smallBoxList' @smallKey='getSmallData' ref='searchQuery'></search-box>
    <!-- hotKey列表 -->
    <div class='hotkey_wrapper'>
      <div v-show='!query'>
        <p class='hotSearch'>热门搜索</p>
        <ul>
           <li @click='selectItem(item.k)' class='keyItem' v-for='item in hotKey'>{{item.k}}</li>
        </ul>
        <div v-if='searchHistory.length' class='history-layout'>
          <history @delAll='deleAllHistory' @delData='deleHistoryKey' :dataArray='searchHistory' @searchAgine='selectItem'></history>
        </div>
      </div>
    <!-- 最终搜索结果 -->
      <div class='resultWrapper' v-show = 'query'>
        <result-list :query='query' @saveHistory='saveHistory' @listScroll='blurInput'></result-list>
      </div>
    </div>
    <router-view></router-view>
	</div>
</template>
<script>
import SearchBox from '../base/search-box'
import getHotKey from '../../js/getHotKey.js'
import ResultList from '../searchResultList'
import getSmallValue from '../../js/samllBox'
import {mapGetters, mapActions} from 'vuex'
import History from '../base/history'
export default {
  name: 'search',
  data () {
    return {
      hotKey: [],
      query: '',
      smallBoxList: {}
    }
  },
  components: {
    SearchBox,
    ResultList,
    History
  },
  created () {
    this._getHotKey()
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    getQuery (query) {
      // 回车搜索
      this.query = query
    },
    saveHistory (value) {
      this.saveHistoryKey(value)
    },
    blurInput () {
      this.$refs.searchQuery.blur()
    },
    _getHotKey () {
      getHotKey().then(res => {
        this.hotKey = res.data.hotkey.slice(0, 12)
      })
    },
    getSmallData (value) {
      // 小盒子搜索
      getSmallValue(value).then(res => {
        if (res.data === undefined) {
          return
        }
        this.smallBoxList = res.data
      })
    },
    selectItem (key) {
      this.$refs.searchQuery.setQuery(key)
    },
    ...mapActions([
      'saveHistoryKey',
      'deleHistoryKey',
      'deleAllHistory'
    ])
  }
}
</script>
<style>
  .search{
    padding-top: 10px;
  	background: #212021;
    /*background: #a524a5;*/
    /*background: #bc35e3;*/
    position: relative;
  }
  .history-layout{
    margin-top: 20px;
  }
  .hotkey_wrapper{
    width: 85%;
    margin: auto;
    position: absolute;
    top:48px;
    bottom: 65px;
    left: 50%;
    z-index:0;
    transform: translateX(-50%);

  }
  .hotSearch {
    font-weight: 500;
    color:#848484;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .hotkey_wrapper ul {
    overflow: hidden;
  }
  .keyItem{
    background: #333;
    color:#717171;
    padding:3px 8px;
    border-radius: 3px;
    font-size: 13px;
    margin-right: 33px;
    margin-bottom: 10px;
    float: left;
  }
  .resultWrapper{
    height:100%;
    overflow: hidden;
  }
</style>