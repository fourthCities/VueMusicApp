import Vue from 'vue'
import Router from 'vue-router'
import Singers from '../components/singers'
import rankingList from '../components/rank'
import Search from '../components/search'
import Home from '../components/home'
import singerDetail from '../components/singer-detail'
import Playlist from '../components/play-list'
import topDetail from '../components/top-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: ':id',
          component: Playlist
        }
      ]
    },
    {
      path: '/singers',
      name: 'Singers',
      component: Singers,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/ranking-list',
      name: 'rankingList',
      component: rankingList,
      children: [
        {
          path: 'topdetail/:id',
          component: topDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children: [
        {
          path: 'singerDetail/:id',
          component: singerDetail
        }
      ]
    }
  ]
})
