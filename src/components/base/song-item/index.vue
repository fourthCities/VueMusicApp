<template>
	<div>
		<ul>
			<li v-for='(item,index) in dataList' class='song_list' @click='clickSong(index,item)'>
				<div class='song_content'>
					<h3 class='song_name'>{{item.name}}</h3>
					<p class='singer_and_album'>{{getContant (item)}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/ecmascript-6">
export default{
  props: {
    dataList: {
      type: Array,
      default: []
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  methods: {
    getContant (song) {
      return `${song.singer}-${song.album}`
    },
    clickSong (index, item) {
      this.$emit('clickSong', index, item)
    }
  }
}
</script>
<style>
.song_content{
	padding:5px 25px;
}
.song_list{
	border-bottom: 1px solid #f00;
}
.song_name{
	color:#cecece;
	font-size: 16px;
	margin-bottom:5px;
	font-weight: 100;
	padding:5px 0;
}
.singer_and_album{
	color:#4a494a;
	width:100%;
	text-overflow:ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-size: 13px;
}
</style>