import PdTable from "./table";
import { use, registerColumnType } from './column-type'
// 列类型注册函数

PdTable.install = function (Vue) {
  Vue.component(PdTable.name, PdTable);
};

PdTable.use = use
PdTable.registerColumnType = registerColumnType

export default PdTable;
