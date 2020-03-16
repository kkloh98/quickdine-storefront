import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./ext";
import ApiClient from "./mixins/ApiClient.vue";

Vue.config.productionTip = false;

Vue.mixin(ApiClient);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
