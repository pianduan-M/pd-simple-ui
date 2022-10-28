import { isFunction, isString, isArray } from '@/utils/is'
import { getSelectOptions } from '@/utils/index'
import { datePickerDefaultProps } from './form-props'

// 创建 form item
export function createFormItems() {
  const h = this.$createElement

  this._colLayout = { ...this.colLayout }

  let formItems = []
  try {
    formItems = this.formItems
      // 过滤隐藏表单 isHidden 可以是一个函数并且这个函数的 this 是指向 from 的父组件
      .filter(item => {
        const isHidden = item.isHidden
        if (isFunction(isHidden)) {
          return !isHidden.call(this.$parent, this.value)
        }
        return !isHidden
      })
      .map(item => {
        let {
          layout,
          component,
          options,
          renderLabel,
          isHidden,
          style,
          class: formItemClassName,
          slot,
          inputAttrs,
          placeholder,
          formatter,
          ...rest
        } = item

        layout = layout ? layout : this._colLayout

        return h(
          'el-col',
          {
            props: { ...layout },
            key: item.label
          },
          [
            h('el-form-item', {
              props: {
                ...this.globalFormItemProps,
                ...rest
              },
              scopedSlots: createFormItemChildren.call(this, item),
              style,
              class: formItemClassName,
              key: item.prop || Math.random()
            })
          ]
        )
      })
  } catch (error) {
    throw new Error(error)
  }

  return formItems
}

function createFormItemChildren(item) {
  let defaultChildren

  if (this.type === 'form') {
    defaultChildren = createFormInputs.call(this, item)
  } else {
    defaultChildren = createFormItemByValue.call(this, item)
  }

  let result = {
    default() {
      return defaultChildren
    }
  }

  const label = createFormItemLabelSlot.call(this, item)
  result = {
    ...result,
    ...label
  }

  return result
}

// 创建formItem label
function createFormItemLabelSlot(formItem) {
  const h = this.$createElement

  // 如果有 form label 渲染函数
  if (formItem.renderLabel && isFunction(formItem.renderLabel)) {
    return {
      label: props => {
        return formItem.renderLabel(h, formItem, props)
      }
    }
  } else if (formItem.renderLabel && isString(formItem.renderLabel)) {
    const slot = this.$slots[formItem.renderLabel]
    if (slot) {
      return {
        label: () => {
          return slot
        }
      }
    }
  }

  return {}
}

// 创建 form item 里的 表单
function createFormInputs(item) {
  const h = this.$createElement

  if (item.slot) {
    return createSlots.call(this, item.slot)
  }

  let props = item.inputAttrs?.props || {}
  const events = item.inputAttrs?.on || {}
  const style = item.inputAttrs?.style || {}
  const attrs = item.inputAttrs?.attrs || {}
  const className = item.inputAttrs?.class || []

  props = getAsyncDataByFormInput.call(this, props, item)

  // 如果是 select
  let children = undefined
  if (item.component === 'el-select') {
    children = getSelectOptions(item, this.selectOptionMap).map(option => {
      return h('el-option', {
        props: {
          value: option.value,
          label: option.label
        },
        key: option.value
      })
    })
  }

  if (item.component && item.component.includes('date')) {
    props = { ...datePickerDefaultProps, ...props }
  }

  // v-model 事件 如果是input 绑定 input 事件其他绑定 change 事件
  let model = {}
  if (item.component) {
    const modelEventName = 'input'

    model = {
      [modelEventName]: val => {
        const formData = { ...this.value }
        formData[item.prop] = val
        this.$emit('input', formData)
        events[modelEventName] && events[modelEventName](val, item.prop)
      }
    }
  }

  // 表单项的公共配置
  const {
    class: commonClassName = [],
    style: commonStyle = {},
    props: commonProps = {}
  } = this.defaultInputAttrs

  if (item.component && item.component.indexOf('el') !== -1 && !commonStyle.width) {
    commonStyle.width = '240px'
  }

  return [
    h(
      item.component,
      {
        props: {
          options: item.options,
          ...commonProps,
          value: this.value[item.prop],
          ...props
        },
        on: {
          ...events,
          ...model
        },
        style: {
          ...commonStyle,
          ...style
        },
        class: { ...commonClassName, ...className },
        attrs: {
          placeholder: item.placeholder,
          ...attrs
        }
      },
      children
    )
  ]
}

// 当 type 为 detail 时 创建文本或其他类型
function createFormItemByValue(item) {
  const { formatter, prop } = item
  let value = ''
  if (formatter) {
    value = formatter(this.value, this.$createElement, item)
  } else {
    value = this.value[prop]
  }

  value = value ? value : '-'

  return [value, createFormItemContentDesc.call(this, item)]
}

function createFormItemContentDesc(item) {
  const h = this.$createElement
  const desc = item.contentDesc
  const slot = this.$slots[desc]
  let result = ''

  if (slot) {
    result = slot
  } else if (desc) {
    result = h('span', { class: 'form-item-content-desc' }, desc)
  }

  return result
}

function createSlots(slotName) {
  const slots = this.$slots[slotName]
  if (slots) {
    return slots
  }
  return ''
}

// 表单内组件的异步 props 传递一个数组 key 或者字符串在 selectOptionMap 中获取异步数据
function getAsyncDataByFormInput(props, item) {
  const asyncProps = item.inputAttrs.asyncProps
  if (asyncProps) {
    if (isString(asyncProps)) {
      props[asyncProps] = this.selectOptionMap[asyncProps]
    } else if (isArray(asyncProps)) {
      asyncProps.forEach(key => {
        props[key] = this.selectOptionMap[key]
      })
    }
  }
  return props
}
