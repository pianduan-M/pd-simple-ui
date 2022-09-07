import { isObject, isFunction, isString, isArray } from "../../src/utils/is";
import { isVNode } from '../../src/utils/vdom'
import { columnTypeList, isNativeColumnType } from './column-type'

import {
  formatRowDataByKey,
} from "../../src/utils/index";

// 创建表格列
export function createTableColumn(h, columns, commonColumnOptions) {

  // 创建前调用
  columns = this.eventBus.emit('on-before', columns)

  if (!columns) {
    throw new Error(`event on-before  result columns null`)
  }

  if (columns instanceof Array) {
    return columns.map((column) => {
      let { on = {}, class: className = {}, style = {}, children, formatter, enumList, slot, unit, ...props } = column

      if (children && Array.isArray(children)) {

        //  创建 children 前调用
        const hooksResult = this.eventBus.emit('on-before-create-children', { children, column })
        children = hooksResult.children

        if (!children) {
          throw new Error(`event on-before-create-children  result children null`)
        }

        const recursionChildren = createTableColumn.call(this, h, children, commonColumnOptions)

        return h("el-table-column", {
          props: { ...commonColumnOptions, ...props },
          on, class: className, style,
        }, recursionChildren)
      } else {
        let scopedSlots = {}

        if (!isNativeColumnType(column.type)) {
          scopedSlots = createScopedSlots.call(this, column, h)
        }
        console.log(props, 'props');

        return h("el-table-column", {
          props: { ...commonColumnOptions, ...props },
          on,
          class: className,
          style,
          scopedSlots: scopedSlots,
          key: column.prop || column.label || Math.random()
        })
      }
    });
  }
  return [];
};

// 创建作用域插槽
function createScopedSlots(column, h) {

  // 创建插槽内容前调用
  const resultResult = this.eventBus.emit('on-before-create-column-slot', column)

  if (!resultResult) {
    throw new Error(`event on-before-create-column-slot  result column null`)
  }

  if (isVNode(resultResult)) {
    return resultResult
  } else {
    column = resultResult
  }

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
    return () => this.nullValueDefault
  }
}

// table column default
function createDefaultSlot(h, column) {

  return ({ row }) => {
    // 如果有指定列类型 直接调用注册过的处理方法
    const { type } = column
    if (type) {
      const handler = columnTypeList[type]
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
