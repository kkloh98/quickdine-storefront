import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./ext";
import ApiClient from "./mixins/ApiClient.vue";
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false;

Vue.mixin(ApiClient);

Vue.use(VeeValidate);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
