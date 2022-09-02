import { isObject, isFunction, isString, isArray } from "../../src/utils/is";
import { isVNode } from '../../src/utils/vdom'
import { columnTypeList } from './column-type'

import {
  formatRowDataByKey,
} from "../../src/utils/index";

// 创建表格列
export function createTableColumn(h, columns, commonColumnOptions) {
  if (columns instanceof Array) {
    return columns.map((column) => {
      const { on = {}, class: className = {}, style = {}, children, formatter, columnType, enumList, slot, unit, ...props } = column
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
        default: createSlotByFunctionType.call(this, h, column.slot, column)
      };
    case isObject(column.slot):
      const resultSlots = {}
      Object.keys(column.slot).map(key => {
        const value = column.slot[key]
        if (isFunction(value)) {
          resultSlots[key] = createSlotByFunctionType.call(this, h, value, column)
        } else {
          resultSlots[key] = createSlotByStringType.call(this, h, value)
        }
      })

      return resultSlots
    // 如果是 字符串类型 就当做是插槽名使用作用域插槽
    case isString(column.slot):
      return {
        default: createSlotByStringType.call(this, h, column.slot, column)
      }
    // 没有 slot 当做普通列 调用 formatter 和 拼接 unit
    default:
      return {
        default: createDefaultSlot.call(this, h, column)
      };
  }
};

// if slot is function vNode or html string
function createSlotByFunctionType(h, slot, column) {
  return function ({ row }) {
    const result = slot(h, row, column)
    switch (true) {
      // if result is vNode
      case isVNode(result):
        return result
      // if result is html string
      case isString(result):
        return h('div', { domProps: { innerHTML: result } })
      // if result is component or dom
      case isObject(result):
        const { name, on, class: className = {}, style = {}, ...rest } = result
        return h(name, { props: { row, prop: column.prop, column, ...rest }, on, class: className, style })
    }
  }
}

// if slot is string
function createSlotByStringType(h, slot, column) {
  const scopedSlot = this.$scopedSlots[slot];
  if (scopedSlot) {
    return function (props) {
      return scopedSlot(props);
    }
  } else {
    return createDefaultSlot.call(this, h, column)
  }
}


// table column default
function createDefaultSlot(h, column) {

  return ({ row }) => {
    // 如果有指定列内容类型 直接调用
    const { columnType } = column
    if (columnType) {
      const handler = columnTypeList[columnType]

      if (handler) {
        return handler.call(this, h, row, column)
      }
    }

    let value = formatRowDataByKey(column.prop, row);
    value = value ? value : this.nullValueDefault;
    if (column.formatter && isFunction(column.formatter)) {
      value = column.formatter(row);
    }
    return value + (column.unit ? column.unit : "");
  }
}
