import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
Vue.use(ElementUI);
import "element-ui/lib/theme-chalk/index.css";

import { mockXHR } from "../mock";
mockXHR();

import PdSimpleUi from "../packages";
Vue.use(PdSimpleUi);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
