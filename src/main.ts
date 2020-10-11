import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import install from "./config/install";
Vue.config.productionTip = false;
Vue.use(install);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
