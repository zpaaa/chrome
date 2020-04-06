import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as dragStore from './lib/drag'
import './scss/index.scss'
Vue.config.productionTip = false
Vue.use(dragStore)
new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
