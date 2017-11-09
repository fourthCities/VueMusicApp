<template>
	<scroll :data='topList' class='lili'>
	<div class='rank-layout'>
		<div v-for='item in topList' class='lisis'>
			<div class='billboard' @click='selectItem(item)'>
				<div class='leftImg'>
					<img v-lazy="item.picUrl">
				</div>
				<div class='shortList'>
					<p v-for='shortList in item.songList'>
						{{shortList.songname}}-{{shortList.singername}}
					</p>
				</div>
			</div>
		</div>
	</div>
	<router-view></router-view>
	</scroll>
	</div>
</template>
<script>
import rankData from '../../js/rank-data'
import Scroll from '../base/scroll/scroll'
import {mapMutations} from 'vuex'
export default {
  name: 'rankList',
  data () {
    return {
      topList: []
    }
  },
  methods: {
    getData () {
      rankData().then((res) => {
        this.topList = res
      })
    },
    selectItem (item) {
      this.setTopId(item.id)
      this.$router.push(`/ranking-list/topdetail/${item.id}`)
    },
    ...mapMutations({
      setTopId: 'SET_TOPID'
    })
  },
  created () {
    this.getData()
  },
  components: {
    Scroll
  }
}
</script>
<style>
	.lili{
		overflow: hidden;
	}
	.lisis{
		padding-top:15px;
	}
	.rank-layout{
		padding-bottom: 55px;
		position: relative;
	}
	.billboard{
		display: flex;
		padding:0 5%;
		justify-content: space-between;
	}
	.billboard:hover{
		background: #f00;
	}
	.leftImg {
		width:40%;
	}
	.leftImg img{
		width: 100%;
		display: block;
	}
	.shortList{
		width:60%;
		color: #fff;
		background: #333333; 
		padding:15px 0px;
		display: flex;
		font-weight: 100;
		font-size: 14px;
		justify-content: space-around;
		flex-direction: column;
	}
	.shortList p{
		margin-left:20px;
		text-overflow:ellipsis;
		overflow: hidden;
		white-space:nowrap;
		letter-spacing: -1px;
	}
</style>	