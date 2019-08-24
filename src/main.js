import Vue from 'vue'
import App from './App.vue'
import Scavenge from './Scavenge.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Scavenge),
}).$mount('#app')
