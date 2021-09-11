import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import moment from 'moment'

import  { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.prototype.moment = moment

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})