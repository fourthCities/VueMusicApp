import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/css/icon/iconfont.css'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueLazyload, {
  loading: require('./assets/logo.png')
})
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
