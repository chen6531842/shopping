import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import install from "./config/install";
import "vant/lib/index.css";
Vue.config.productionTip = false;
Vue.use(install);
import Component from "vue-class-component";
Component.registerHooks([
  "beforeRouteEnter", //进入路由之前
  "beforeRouteLeave", //离开路由之前
  "beforeRouteUpdate"
]);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
