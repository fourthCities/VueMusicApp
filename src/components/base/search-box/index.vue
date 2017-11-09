<template>
  <div class="search-box">
  	<div class="search-input">
  		<div>
  			<i>1</i>
  		</div>
  		<input type="text" name="search" @blur='ifenter=true ' :placeholder='placeholder' v-model='query' @keydown= 'lastSearch' ref='inputValue'>
  		<div class='del' @click='del'>
  			<i v-show = "query">2</i>
  		</div>
  	</div>
      <div class='smallBox' v-if='smallBox'>
        <transition name='list'>
          <ul v-show='query && !ifenter'>
            <li class='smallResult' v-for = 'item in smallBoxList'>
              <div class='smallTitle'>{{item.name}}</div>
              <div class='smallItem' >
                <ul>
                  <li @click='selectSmallItem(items,item.type)' v-for = 'items in item.itemlist'><span class='smallSongName'>{{items.name}}</span><span v-if='item.type!=2'>-{{items.singer}}</span></li>
                </ul>
              </div>
            </li>
          </ul>
        </transition>
      </div>
  </div>
</template>
<script type="text/javascript">
// import {debounce} from '../../../js/dom/dom'
export default {
  props: {
    placeholder: {
      default: '搜索歌曲、歌手',
      type: String
    },
    smallBoxList: {
      type: Object,
      default: function () {
        return {}
      }
    },
    smallBox: {
      type: Boolean,
      default: true
    }
  },
  name: 'searchBox',
  data () {
    return {
      query: '',
      ifenter: true,
      flag: false
    }
  },
  created () {
    this.$watch('query', (newValue) => {
      // 监听query,如果新的值是空,那么就不进行小搜索
      if (this.flag) {
        this.flag = false
        this.ifenter = true
      } else {
        this.ifenter = false
      }
      // 小盒子的搜索  要节流
      this.$emit('smallKey', newValue)
      if (newValue === '') {
        this.$emit('changeQuery', newValue)
        return
      }
    })
  },
  methods: {
    del () {
      this.query = ''
    },
    blur () {
      this.$refs.inputValue.blur()
    },
    selectSmallItem (items, type) {
      let str = ''
      if (type === 2) {
        str = items.name
      } else {
        str = `${items.name} ${items.singer}`
      }
      this.$emit('selectSmall', str)
    },
    lastSearch (e) {
      // 如果按下的是回车键，并且输入框的值不是'',那么就进行大搜索
      if (e.keyCode === 13 && this.$refs.inputValue.value !== '') {
      // 最终回车键搜索
        this.ifenter = true
        this.$emit('changeQuery', this.query)
      }
    },
    setQuery (newQuery) {
      this.flag = true
      this.query = newQuery
      this.$emit('changeQuery', newQuery)
    }
  }
}
</script>
<style type="text/css">
	.search-box{
		width: 85%;
		margin:auto;
    padding:0 6px;
		position: relative;
    z-index:10;
	}
  .search-input{
    outline: none;
    color:#f00;
    width: 100%;
    border-radius: 5px;
    background: #333333;
    outline: none;
    padding: 6px 0px;
    display: flex;
    justify-content: space-between;
  }
	.search-box input{
		flex-grow: 1;
		margin: 0px 5px;
		height: 12px;
		color:#717171;
		background: #333333;
		outline:none;
		border:none;
	}
	.search-input div{
		width: 13px;
		height: 100%;
	}
  .smallBox ul{
    width:100%;
    font-size: 12px;
    border-radius:0 0 5px 5px;
    background: #f3f3f3;
    overflow: hidden;
  }
  .smallResult{
    display: flex;
    color: #7a7a7a;
  }
  .smallTitle{
    width: 20%;
    border-right: 1px solid #c9c9c9;
    padding-top: 5px;
    text-align: center;
  }
  .smallItem{
    width: 80%
  }
  .smallItem li{
    padding: 6px;
    padding-left: 20px;
  }
  .smallSongName{
    color: #31c27c;
  }
  .smallItem li:last-child{
    border-bottom: 1px solid #c9c9c9;
  }
  .list-enter-active,.list-leave-active{
    transition: all 1s;
  }
  .list-enter,.list-leave-to{
    opacity: 0;
  }
</style>