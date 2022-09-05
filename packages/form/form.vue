<script>
import { isObject, isFunction, isString, isUndef } from "../../src/utils/is";
import { createEventsObj, getSelectOptions } from "../../src/utils/index";
import { createFormItems } from "./form-create";
import { formProps } from "./form-props";

export default {
  name: "PdForm",
  inject: ["dialogVisible"],
  props: {
    ...formProps,
  },
  methods: {
    validate() {
      return this.$refs.formRef.validate();
    },
    getFormRef() {
      return this.$refs.formRef;
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
    // 监听 dialog 关闭 自动清除表单校验
    visible() {
      if (!this.visible && this.autoClearValidate) {
        this.$refs.formRef.clearValidate();
      }
    },
  },

  render(h) {
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
          createFormItems.call(this)
        ),
      ]
    );
  },
  computed: {
    // 祖先节点 提供一个 dialog 开关标识
    visible() {
      let result = false;

      if (this.dialogVisible && isFunction(this.dialogVisible)) {
        result = this.dialogVisible();
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
.form-item-content-desc {
  margin: 0 10px;
  font-size: 14px;
  font-weight: normal;
  color: #999;
}
</style>
