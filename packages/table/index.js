import PdTable from "./table";
import { use } from './column-type'

PdTable.install = function (Vue) {
  Vue.component(PdTable.name, PdTable);
};

PdTable.setGlobalTableOptions = (globalTableOptions) => {
  const originPdTableData = PdTable.data;
  PdTable.data = function () {
    this.globalTableOptions = globalTableOptions;
    return originPdTableData.call(this);
  };
};

PdTable.use = use

export default PdTable;
