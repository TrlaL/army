import Vue from 'vue'
import VueBus from 'vue-bus'
import GlobalEvents from 'vue-global-events'
import App from './App'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueBus)
Vue.component('GlobalEvents', GlobalEvents)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router: router,
  store: store,
  template: '<App/>'
}).$mount('#app')
