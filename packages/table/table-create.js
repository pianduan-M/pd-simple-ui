import { isObject, isFunction, isString } from "../../src/utils/is";

import {
  formatRowDataByKey,
} from "../../src/utils/index";

// 创建表格列
export function createTableColumn(h, columns, commonColumnOptions) {
  if (columns instanceof Array) {
    return columns.map((column) => {
      const { on = {}, class: className = {}, style = {}, children, formatter, slot, unit, ...props } = column
      if (children && Array.isArray(children)) {
        return h("el-table-column", {
          props: { ...commonColumnOptions, ...props },
          on, class: className, style,
        }, createTableColumn.call(this, h, children, commonColumnOptions))
      } else {
        return h("el-table-column", {
          props: { ...commonColumnOptions, ...props },
          on,
          class: className,
          style,
          scopedSlots: column.type ? {} : createScopedSlots.call(this, column, h),
        })
      }
    });
  }
  return [];
};

// 创建作用域插槽
function createScopedSlots(column, h) {
  switch (true) {
    // 如果是函数 返回结果直接应用innerHTML
    case isFunction(column.slot):
      return {
        default: createSlotByFunctionType.call(this, h, column.slot)
      };
    case isObject(column.slot):
      const resultSlots = {}
      Object.keys(column.slot).map(key => {
        const value = column.slot[key]
        if (isFunction(value)) {
          resultSlots[key] = createSlotByFunctionType.call(this, h, value)
        } else {
          resultSlots[key] = createSlotByStringType.call(this, h, value)
        }
      })
      console.log(resultSlots, 'resultSlots');
      return resultSlots
    // 如果是 字符串类型 就当做是插槽名使用作用域插槽
    case isString(column.slot):
      return {
        default: createSlotByStringType.call(this, h, column.slot)
      }
    // 没有 slot 当做普通列 调用 formatter 和 拼接 unit
    default:
      return {
        default: ({ row }) => {
          let value = formatRowDataByKey(column.prop, row);
          value = value ? value : this.nullValueDefault;
          if (column.formatter && isFunction(column.formatter)) {
            value = column.formatter(row);
          }
          return value + (column.unit ? column.unit : "");
        },
      };
  }
};

function createSlotByFunctionType(h, slot) {
  return function ({ row }) {
    const result = slot(row)
    if (isObject(result)) {
      const { name, children, scopedSlots, ...reset } = result
      return h(name, { scopedSlots: (scopedSlots && isFunction(scopedSlots)) ? scopedSlots(h) : {}, ...reset }, children ? children(h, row) : null)
    } else {
      return h('div', { domProps: { innerHTML: result } })
    }
  }
}

function createSlotByStringType(h, slot) {
  const scopedSlot = this.$scopedSlots[slot];
  if (scopedSlot) {
    return function (props) {
      return scopedSlot(props);
    }
  }
}
