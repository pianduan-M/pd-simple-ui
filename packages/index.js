import PdForm from "./form";
import PdTable from "./table";
import PdSearchForm from "./search-form";
import PageContent from "./page-content";

import { pdTableEnumColumnTypePlugin } from './table/src/column-type'

const components = [PdForm, PdTable, PdSearchForm, PageContent];

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
  PageContent,
  pdTableEnumColumnTypePlugin
};
