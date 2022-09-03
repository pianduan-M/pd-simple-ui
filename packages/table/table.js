
import { createTableColumn } from './table-create'
import { registerColumnType, tablePluginList } from './column-type'
import { eventBus } from '../../src/utils/event-bus';


export default {
  name: "PdTable",
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    commonColumnOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    nullValueDefault: {
      default: "-",
    },
  },
  data() {
    return {
      globalTableOptions: {},
    };
  },
  beforeCreate() {
    // event bus
    this.eventBus = new eventBus()

    // 列类型注册函数
    this.registerColumnType = registerColumnType
    // 注册插件
    tablePluginList.map(execute => execute.call(this))
  },
  components: {},
  methods: {},
  mounted() { },
  render(h) {
    // 合并默认配置
    let { commonColumnOptions, columns } = this.$props;
    const globalTableOptions = this.globalTableOptions
      ? this.globalTableOptions
      : {};

    return h(
      "el-table",
      {
        props: { ...globalTableOptions, ...this.$attrs },
        on: this.$listeners,
      },
      createTableColumn.call(this, h, columns, commonColumnOptions)
    );
  },
};

