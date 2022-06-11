import { isObject, isFunction, isString, isUndef } from "../../utils/is";
import { createEventsObj, getSelectOptions } from "../../utils/index";

export default {
  name: "PdForm",
  props: {
    // 绑定的 formData 数据
    value: {
      type: Object,
      required: true,
    },
    initFormData: {
      type: Object,
      default() {
        return {};
      },
    },
    // 创建 formItem 配置项
    formItems: {
      type: Array,
      default() {
        return [];
      },
    },
    // el-col 布局配置
    colLayout: {
      type: Object,
      default() {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24,
        };
      },
    },

    formItemAttrs: {
      type: Object,
      default() {
        return {};
      },
    },

    // 布局行的props
    rowAttrs: {
      type: Object,
      default() {
        return {};
      },
    },

    defaultInputAttrs: {
      type: Object,
      default() {
        return {};
      },
    },
    vertical: {
      type: Boolean,
      default: true,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    selectOptionMap: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    validate() {
      return this.$refs.formRef.validate();
    },
  },
  watch: {
    initFormData: {
      handler(newVal) {
        if (newVal && isObject(newVal)) {
          const newFormData = {};
          Object.keys(this.value).forEach((key) => {
            const formItemValue = this.initFormData[key];
            if (isUndef(formItemValue)) {
              newFormData[key] = "";
            } else {
              newFormData[key] = formItemValue;
            }
          });

          this.$emit("input", newFormData);
        }
      },
      immediate: true,
    },
  },

  render(h) {
    const createSlots = (slotName) => {
      const slots = this.$slots[slotName];
      if (slots) {
        return slots;
      }
      return "";
    };

    // 创建 form item 里的 表单
    const createFormInputs = (item) => {
      if (item.slotName) {
        return createSlots(item.slotName);
      }
      const props = item.inputOptions?.props || {};
      const events = item.inputOptions?.on || {};
      const style = item.inputOptions?.style || {};
      const className = item.inputOptions?.class || {};

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
            console.log(val, modelEventName);
            const formData = { ...this.value };
            formData[item.prop] = val;
            this.$emit("input", formData);
            events[modelEventName] && events[modelEventName](val);
          },
        };
      }

      return [
        h(
          item.type,
          {
            props: {
              ...this.defaultInputAttrs,
              value: this.value[item.prop],
              placeholder: item.placeholder,
              ...props,
            },
            on: {
              ...createEventsObj.call(this.$parent, events),
              ...model,
            },
            style: {
              width: "100%",
              ...style,
            },
            class: className,
          },
          children
        ),
      ];
    };

    // 创建formItem label
    const createFormItemLabelSlot = (formItem) => {
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

    // 创建 form item
    const createFormItems = () => {
      this._colLayout = { ...this.colLayout };

      let formItems = [];
      try {
        formItems = this.formItems
          // 过滤隐藏表单 ishidden 可以是一个函数并且这个函数的 this 是指向 from 的父组件
          .filter((item) => {
            const ishidden = item.isHidden;
            if (isFunction(ishidden)) {
              return ishidden.call(this.$parent);
            }
            return !ishidden;
          })
          .map((item) => {
            const layout = item.layout ? item.layout : this._colLayout;
            const itemAttrs = isObject(item.attrs) ? item.attrs : {};
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
                      ...this.formItemAttrs,
                      ...itemAttrs,
                      label: item.label,
                      rules: item.rules,
                      prop: item.prop,
                    },
                    scopedSlots: createFormItemLabelSlot(item),
                    style: item.style,
                    class: item.class,
                  },
                  createFormInputs(item)
                ),
              ]
            );
          });
      } catch (error) {
        throw new Error(error);
      }
      return formItems;
    };

    return h(
      "el-form",
      {
        props: { ...this.$attrs },
        style: this.$attrs.style ? this.$attrs.style : {},
        class: this.$attrs.class ? this.$attrs.class : {},
        on: this.$listeners,
        ref: "formRef",
      },
      [
        h(
          "el-row",
          {
            props: { ...this.rowAttrs },
            class: this.rowAttrs.class,
            style: this.rowAttrs.style,
          },
          createFormItems()
        ),
      ]
    );
  },
};
