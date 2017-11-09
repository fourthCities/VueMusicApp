<template>
	<div class="singer">
    <list-view :dataList='singerList' @clickSinger='toSinger'></list-view>
    <router-view class='lisi'></router-view>
	</div>
</template>
<script>
import {getSingerList} from '../../js/getSingerList'
import Singer from '../../js/singer_class'
import ListView from '../base/list-view/list-view'
import {mapMutations} from 'vuex'
const HOT_KEY = '热门'
const HOT_SINGER_LEN = 10
export default {
  name: 'singer',
  data () {
    return {
      singerList: [],
      size: 0
    }
  },
  created () {
    window.screen.width > 640 ? this.size = 800 : this.size = 300
    Promise.all([this.getSingerdata(), this.getSingerdata(2)]).then((result) => {
      var list = result[0].list.concat(result[1].list)
      this.singerList = this.sort_singerList(list)
    })
  },
  methods: {
    toSinger (item) {
      this.$router.push({
        path: `/singers/${item.midId}`
      })
      this.setSinger(item)
    },
    getSingerdata (num) {
      let singerPage = num || 1
      return new Promise((resolve, reject) => {
        getSingerList(singerPage).then((res) => {
          if (res.data.list.length !== 0) {
            resolve(res.data)
          } else {
            reject('请求超时')
          }
        })
      })
    },
    sort_singerList (singerList) {
      let map = {
        hot: {
          title: HOT_KEY,
          items: []
        }
      }
      singerList.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_id,
            midId: item.Fsinger_mid,
            name: item.Fsinger_name}, this.size))
        } else {
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_id,
            midId: item.Fsinger_mid,
            name: item.Fsinger_name
          }, this.size))
        }
      })
      let hot = []
      let ret = []
      let more = []
      for (let key in map) {
        if (map[key].title === HOT_KEY) {
          hot.push(map[key])
        } else if (map[key].title === '9') {
          more.push(map[key])
        } else {
          ret.push(map[key])
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      more.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret, more)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>
<style>
	.singer{
		background: #212021;
		color: #ccc;
		position: relative;
	}
</style>