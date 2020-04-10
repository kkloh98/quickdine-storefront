import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import router from './router'
import './ext'
import ApiClient from './mixins/ApiClient.vue'
import VeeValidate from 'vee-validate'
import store from './store/store'
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)

Vue.config.productionTip = false

Vue.mixin(ApiClient)

Vue.use(VeeValidate)

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
