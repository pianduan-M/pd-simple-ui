import PdForm from "./form";
import PdTable from "./table";
import PdSearchForm from "./search-form";

const components = [PdForm, PdTable, PdSearchForm];

function install(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
  PdForm,
  PdTable,
  PdSearchForm,
};
