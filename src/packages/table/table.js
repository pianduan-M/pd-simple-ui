import {
  createEventsObj,
  createElementByElType,
  formatRowDataByKey,
} from "../../utils/index";
import { isObject, isFunction, isArray, isString } from "../../utils/is";

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
      getGlobleTableOptions: {},
    };
  },
  components: {},
  methods: {},
  mounted() {},
  render(h) {
    // 合并默认配置
    let { commonColumnOptions, columns } = this.$props;
    const globleTableOptions = this.getGlobleTableOptions
      ? this.getGlobleTableOptions
      : {};

    // 创建作用域插槽
    const createScopedSlots = (column) => {
      // 如果有 render 配置项
      if (column.slots) {
        return {
          default(props) {
            return crateScopedSlotsElement(h, column, props);
          },
        };
      }
      // 如果是插槽
      if (column.slotName) {
        const scopedSlot = this.$scopedSlots[column.slotName];
        if (scopedSlot) {
          return {
            default(props) {
              return scopedSlot(props);
            },
          };
        }
      }
      return {
        default: ({ row }) => {
          let value = formatRowDataByKey(column.prop, row);
          value = value ? value : this.nullValueDefault;

          if (column.formatter && isFunction(column.formatter)) {
            value = column.formatter(value);
          }

          return value + (column.unit ? column.unit : "");
        },
      };
    };

    // 根据配置项生成元素工具函数
    const createSlotElement = (item, row, column) => {
      if (typeof item === "string") return item;

      const props = isFunction(item.props) ? item.props(row) : item.props;
      let children = "";

      // table-column 子元素
      switch (true) {
        case isFunction(item.children):
          children = item.children(row);
          break;
        case isObject(item.children):
          children = createSlotElement(item.children);
          break;
        case isArray(item.children):
          children = item.children.map((childrenItem) =>
            createSlotElement(childrenItem)
          );
          break;
        case isString(item.children):
          children = item.children;
          break;
        default:
          children = row[column.prop];
      }

      // 指定了类型
      if (item.elType) {
        return createElementByElType.call(this, h, item, row);
      }

      return h(
        item.elName,
        {
          props,
          style: item.style,
          class: item.class,
          on: createEventsObj.call(this.$parent, item.on, row),
          attrs: item.attrs,
        },
        children
      );
    };

    // 根据配置创建 table column children
    const crateScopedSlotsElement = (h, column, props) => {
      let { slots } = column;
      const { row } = props;

      if (!slots) {
        return row[column.prop];
      }

      // 根据配置项类型(最外层配置)创建元素
      switch (true) {
        case isFunction(slots):
          return createSlotElement(slots(row), row, column);
        case isArray(slots):
          return slots.map((item) => createSlotElement(item, row, column));
        case isObject(slots):
          return createSlotElement(slots, row, column);
      }

      throw new Error("slots must array , object , function");
    };

    // 创建列
    const createTableColumn = (h, columns) => {
      if (columns instanceof Array) {
        return columns.map((column) => {
          const columnProps = column.props ? column.props : {};
          try {
            if (column.type) {
              return h("el-table-column", {
                props: {
                  ...commonColumnOptions,
                  ...columnProps,
                  type: column.type,
                  label: column.label,
                  width: column.width || "",
                },
                on: { ...column.on },
                style: column.style || {},
                class: column.class || {},
                key: column.prop,
              });
            } else {
              return h("el-table-column", {
                props: {
                  ...columnProps,
                  ...commonColumnOptions,
                  prop: column.prop,
                  label: column.label,
                  width: column.width || "",
                },
                scopedSlots: createScopedSlots(column),
                class: column.class || {},
                style: column.style || {},
                on: { ...column.on },
                key: column.prop,
              });
            }
          } catch (error) {
            console.log(error, "error");
          }
        });
      }
      return [];
    };

    return h(
      "el-table",
      {
        props: { ...globleTableOptions, ...this.$attrs },
        on: this.$listeners,
      },
      createTableColumn(h, columns)
    );
  },
};
