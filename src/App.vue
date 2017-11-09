<template>
  <div id="app">
    <header-top></header-top>
    <header-nav></header-nav>
    <keep-alive>
      <router-view class="parent-view"></router-view>
    </keep-alive>
    <play-control class='control_layout'></play-control>
  </div>
</template>

<script>
import HeaderNav from './components/headerNav'
import HeaderTop from './components/header'
import PlayControl from './components/play-control'
export default {
  name: 'app',
  components: {
    HeaderTop,
    HeaderNav,
    PlayControl
  }
}
</script>

<style>
#app,html,body{
  height:100%;
  overflow: hidden;
}
.parent-view{
  height:-webkit-calc(100% - 85px);
  background: #212021;
  position: relative;
}
/*.control_layout{
  width:100%;
  height:100%;
}*/
</style>
