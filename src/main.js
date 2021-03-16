import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
// components
import QuantityCounter from "./components/QuantityCounter";
import PageContent from "./components/PageContent";
import Navigation from "./components/Navigation";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.component("qCounter", QuantityCounter);
Vue.component("pContent", PageContent);
Vue.component("navbar", Navigation);

const myRouter = new VueRouter({
  routes: Routes,
  mode: "history",
});

new Vue({
  render: (h) => h(App),
  router: myRouter,
}).$mount("#app");
