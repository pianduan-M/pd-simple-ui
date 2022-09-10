
import { createTableColumn } from './table-create'
import { tablePluginList } from './column-type'
import { eventBus } from '../../../src/utils/event-bus';


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

  },
  created() {
    // 注册插件
    tablePluginList.map(execute => execute.call(this))
  },
  components: {},
  methods: {},
  mounted() { },
  render(h) {

    let { commonColumnOptions, columns } = this

    // 合并默认配置
    const globalTableOptions = this.globalTableOptions
      ? this.globalTableOptions
      : {};

    let tableColumn = createTableColumn.call(this, h, columns, commonColumnOptions)

    return h(
      "el-table",
      {
        props: { ...globalTableOptions, ...this.$attrs },
        on: this.$listeners,
      },
      tableColumn
    );

  },
};

