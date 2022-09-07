import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { mockXHR } from "../mock";
import PdSimpleUi from "../packages";

Vue.use(ElementUI);

mockXHR();

PdSimpleUi.PdTable.registerColumnType('enumType', PdSimpleUi.pdTableEnumColumnTypePlugin, {
  getDomClassName(value) {
    let result = ''
    switch (value) {
      case 1:
        result = 'danger-color'
        break;
      case 2:
        result = 'waring-color'
        break;
    }
    return result
  }
})

Vue.use(PdSimpleUi);


// Vue.component('TableImage', TableImage)

new Vue({
  render: (h) => h(App),
}).$mount("#app");
