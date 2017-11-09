<template>
	<div>
		<div class='history-top'>
			<span>搜索历史</span>
			<span @click='deleAll'>删除全部</span>
		</div>
		<div>
			<ul class='history-list'>
				<li v-for='item in dataArray' @click='searchAgine(item)'>
					<span v-html='item'></span>
					<span @click.stop='deleHistoryData(item)'>删除</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
  export default {
    name: 'history',
    props: {
      dataArray: {
        default: [],
        type: Array
      }
    },
    methods: {
      searchAgine (item) {
        this.$emit('searchAgine', item)
      },
      deleAll () {
        this.$emit('delAll')
      },
      deleHistoryData (item) {
        this.$emit('delData', item)
      }
    }
  }
</script>
<style type="text/css">
	.history-top,.history-list li{
		display: flex;
		justify-content: space-between;
	}
	.history-top {
		color: #848484;
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 15px;
	}
	
	.history-list li{
		width: 100%;
		font-size: 13px;
		color:#717171;
		margin-bottom: 10px;
	}
</style>