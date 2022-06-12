import PdForm from "./packages/form";
import PdTable from "./packages/table";
import PdSearchForm from "./packages/search-form";

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
