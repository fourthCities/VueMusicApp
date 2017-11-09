<template>
	<div class='parent_loading'>
		<img src='../../../assets/image/loading.gif' class='loading_img'>
		<p>{{loadingText}}</p>
	</div>
</template>
<script type='text/ecmascript-6'>
export default {
  props: {
    loadingText: {
      type: String,
      default: '加载中,请稍候'
    }
  }
}
</script>
<style>
.loading_img{
	width:120px;
	height:120px;
	display: block;
	margin:auto;
}

.parent_loading p{
	color:#cecace;
	margin-top: -35px;
	font-size: 12px;
	text-align: center;
}
</style>