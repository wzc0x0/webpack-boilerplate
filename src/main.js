/**
 * webpack entry file
 * the root for this project!
 */

import Vue from "vue";
import "./assets/reset.less";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});