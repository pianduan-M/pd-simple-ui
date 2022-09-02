
import { createTableColumn } from './table-create'

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

