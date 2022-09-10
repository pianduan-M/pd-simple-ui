import { isObject, isFunction, isString, isUndef } from "../../../src/utils/is";
import { createEventsObj, getSelectOptions } from "../../../src/utils/index";

// 创建 form item
export function createFormItems() {
  const h = this.$createElement

  this._colLayout = { ...this.colLayout };

  let formItems = [];
  try {
    formItems = this.formItems
      // 过滤隐藏表单 isHidden 可以是一个函数并且这个函数的 this 是指向 from 的父组件
      .filter((item) => {
        const isHidden = item.isHidden;
        if (isFunction(isHidden)) {
          return isHidden.call(this.$parent);
        }
        return !isHidden;
      })
      .map((item) => {
        let { layout, type, options, renderLabel, isHidden, style, class: formItemClassName, slotName, inputAttrs, placeholder, ...rest } = item

        layout = layout ? layout : this._colLayout;

        return h(
          "el-col",
          {
            props: { ...layout },
            key: item.label,
          },
          [
            h(
              "el-form-item",
              {
                props: {
                  ...this.globalFormItemProps,
                  ...rest
                },
                scopedSlots: createFormItemChildren.call(this, item),
                style,
                class: formItemClassName,
                key: item.prop || Math.random()
              },
            ),
          ]
        );
      });
  } catch (error) {
    throw new Error(error);
  }

  return formItems;
};


function createFormItemChildren(item) {

  const defaultChildren = createFormInputs.call(this, item)
  let result = {
    default() {
      return defaultChildren
    }
  }

  const label = createFormItemLabelSlot.call(this, item)
  result = {
    ...result,
    ...label,
  }

  return result;
}

// 创建formItem label
function createFormItemLabelSlot(formItem) {
  const h = this.$createElement

  // 如果有 form label 渲染函数
  if (formItem.renderLabel && isFunction(formItem.renderLabel)) {
    return {
      label: (props) => {
        return formItem.renderLabel(h, formItem, props);
      },
    };
  } else if (formItem.renderLabel && isString(formItem.renderLabel)) {
    const slot = this.$slots[formItem.renderLabel];
    if (slot) {
      return {
        label: () => {
          return slot;
        },
      };
    }
  }

  return {};
};


// 创建 form item 里的 表单
function createFormInputs(item) {
  const h = this.$createElement

  if (item.slotName) {
    return createSlots.call(this, item.slotName);
  }

  const props = item.inputAttrs?.props || {};
  const events = item.inputAttrs?.on || {};
  const style = item.inputAttrs?.style || {};
  const className = item.inputAttrs?.class || [];

  // 如果是 select
  let children = "";
  if (item.type === "el-select") {
    children = getSelectOptions(item, this.selectOptionMap).map(
      (option) => {
        return h("el-option", {
          props: {
            value: option.value,
            label: option.label,
          },
          key: option.value,
        });
      }
    );
  }

  // v-model 事件 如果是input 绑定 input 事件其他绑定 change 事件
  let model = {};
  if (item.type) {
    const modelEventName =
      item.type.indexOf("input") !== -1 ? "input" : "change";
    model = {
      [modelEventName]: (val) => {
        const formData = { ...this.value };
        formData[item.prop] = val;
        this.$emit("input", formData);
        events[modelEventName] && events[modelEventName](val, item.prop);
      },
    };
  }

  // 表单项的公共配置
  const { class: commonClassName = [], style: commonStyle = {}, props: commonProps = {} } = this.defaultInputAttrs

  return [
    h(
      item.type,
      {
        props: {
          ...commonProps,
          value: this.value[item.prop],
          placeholder: item.placeholder,
          ...props,
        },
        on: {
          ...events,
          ...model,
        },
        style: {
          width: "100%",
          ...commonStyle,
          ...style,
        },
        class: { ...commonClassName, ...className },
      },
      children
    ),
    createFormItemContentDesc.call(this, item)
  ];
};


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

  const slots = this.$slots[slotName];
  if (slots) {
    return slots;
  }
  return "";
};
