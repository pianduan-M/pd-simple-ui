import { isFunction, isArray } from "../../src/utils/is"
import {
  formatRowDataByKey,
} from "../../src/utils/index";


// 储存 column type
export const columnTypeList = {}

export function use(name, fn, options) {
  const handler = fn(options)
  if (!handler && !isFunction(handler)) {
    throw new Error('register table column type must a function')
  }

  if (!name) {
    throw new Error('table column type name is required')
  }

  columnTypeList[name] = handler

}

export function pdTableEnumColumnTypePlugin(options) {
  return function (h, row, column) {
    let result = this.nullValueDefault
    const { prop, enumList, } = column
    const { getDomClassName } = options
    console.log(options, 'options');
    let value = formatRowDataByKey(prop, row);

    if (isArray(enumList)) {
      const existingEnumItem = enumList.find(item => item.value === value)
      const enumValue = existingEnumItem ? existingEnumItem.value : null
      const enumLabel = existingEnumItem ? existingEnumItem.label : null
      if (getDomClassName && enumValue) {
        const className = getDomClassName(existingEnumItem.value)
        if (className) {
          result = h('span', { class: [className] }, enumLabel)
        } else {
          result = enumLabel
        }
      } else {
        result = enumLabel || result
      }
    }

    return result
  }
}
