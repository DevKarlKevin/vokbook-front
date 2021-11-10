import '@/plugins/vue-composition-api'

// Axios Mock Adapter
import '@/@fake-db/db'
import Vue from 'vue'
import '@/styles/styles.scss'
import App from './App.vue'
import './plugins/acl'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import { i18n } from '@/plugins/i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app')
