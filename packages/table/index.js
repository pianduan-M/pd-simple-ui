import PdTable from "./table";

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

export default PdTable;
