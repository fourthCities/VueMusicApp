<template>
	<div class='nav'>
		<router-link tag='div' name='home' to="/home" >推荐</router-link>
		<router-link tag='div' name='singers' to="/singers">歌手</router-link>
		<router-link tag='div' name='rankingList' to="/ranking-list">排行榜</router-link>
		<router-link tag='div' name='search' to="/search" class='lastNav'>搜索</router-link>
	</div>
</template>
<script>
export default {
  name: 'headerNav',
  data () {
    return {}
  }
}
</script>
<style>
	.nav{
		background: #212021;
		box-sizing: border-box;
		border-top:1px solid rgba(255,40,40,0.7);
		clear: left;
		height: 45px;
		cursor: pointer;
	}
	.nav div{
		float: left;
		width: 25%;
		height:21px;
		line-height: 15px;
		font-size: 13px;
		margin-top: 12px;
		margin-left: -1px;
		border-right: 1px solid rgba(255,40,40,0.7);
		text-align: center;	
		color:#cecace;
	}
	div.lastNav {
		border-right:none;
	}
</style>
