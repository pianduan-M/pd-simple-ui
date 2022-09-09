<template>
  <div class="search-form" :style="formStyle">
    <slot name="title"></slot>
    <div class="search-form__wrapper" :class="{ 'flex-wrap': flexWrap }">
      <div class="search-form-item" :class="formItemClass">
        <slot name="before"></slot>
      </div>
      <div
        class="search-form-item"
        :class="formItemClass"
        v-for="item in formItems"
        :key="item.prop"
        :style="formItemStyle"
      >
        <div class="form-item__label" v-if="item.label">
          <slot :name="item.labelSlotName"
            ><span>{{ item.label }}</span
            ><span class="label-suffix" v-if="labelSuffix">{{
              labelSuffix
            }}</span></slot
          >
        </div>
        <div class="form-item__content">
          <el-select
            :size="size"
            v-bind="getItemProps(item)"
            :class="[inputClass, item.class]"
            :value="value[item.prop]"
            v-if="item.type === 'select'"
            v-on="createFormItemEvents(item.on)"
            @change="onInput(item.prop, $event, 'change', item)"
            style="width: 100%"
          >
            <el-option
              v-for="option in getSelectOptions(item)"
              :value="option.value"
              :label="option.label"
              :key="option.value"
            ></el-option>
          </el-select>

          <el-input
            :size="size"
            v-bind="getItemProps(item)"
            :class="[inputClass, item.class]"
            :value="value[item.prop]"
            v-else-if="item.type === 'input'"
            v-on="createFormItemEvents(item.on)"
            @input="onInput(item.prop, $event, 'input', item)"
            style="width: 100%"
          >
          </el-input>
          <el-date-picker
            v-else-if="isDateType(item.type)"
            v-bind="getItemProps(item)"
            :size="size"
            :value="value[item.prop]"
            :type="item.type"
            :class="[inputClass, item.class]"
            v-on="createFormItemEvents(item.on)"
            @input="onInput(item.prop, $event, 'change', item)"
            style="width: 100%"
          ></el-date-picker>
          <component
            v-else-if="item.type"
            :is="item.type"
            v-bind="getItemProps(item)"
            v-model="value[item.prop]"
            :class="[inputClass, item.class]"
            :size="size"
            v-on="createFormItemEvents(item.on)"
            @input="onInput(item.prop, $event, 'input', item)"
            style="width: 100%"
          ></component>
          <slot v-else-if="item.slotName" :name="item.slotName"> </slot>
        </div>
      </div>
      <div class="search-form-item" :class="formItemClass">
        <slot name="after"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { isString, isArray, isObject } from "../../src/utils/is";
import { createEventsObj } from "../../src/utils/index";
import defaultProps, { dateTypes } from "./default-props";

export default {
  name: "PdSearchForm",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    // form items
    formItems: {
      type: Array,
      default() {
        return [];
      },
    },
    gutter: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: "small",
    },
    inputClass: {
      type: String,
      default: "",
    },
    labelSuffix: {
      type: String,
      default: "",
    },
    flexWrap: {
      type: Boolean,
      default: false,
    },
    selectOptionMap: {
      type: Object,
      default() {
        return {};
      },
    },
    commonFormProps: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  methods: {
    onInput(prop, value, eventName, formItem) {
      const searchValue = { ...this.value };
      searchValue[prop] = value;
      if (formItem.on && formItem.on[eventName]) {
        formItem.on[eventName](value, prop);
      }
      this.$emit("input", searchValue);
    },
    getSelectOptions(column) {
      let options = [];
      if (isArray(column.options)) {
        options = column.options;
      } else if (isString) {
        options = this.selectOptionMap[column.options] || [];
      }
      return options;
    },
    createFormItemEvents(events) {
      if (events && isObject(events)) {
        return events;
      }
      return {};
    },
    getItemProps(item = {}) {
      let result = {};
      const {
        type,
        label,
        prop,
        class: className,
        on,
        slotName,
        labelSlotName,
        ...rest
      } = item;
      switch (true) {
        case this.isDateType(type):
          result = {
            ...this.commonFormProps,
            ...this.defaultProps.date,
            ...rest,
          };
          break;

        default:
          result = { ...this.commonFormProps, ...rest };
          break;
      }
      return result;
    },
    isDateType(type) {
      return dateTypes.includes(type);
    },
  },
  created() {
    this.defaultProps = defaultProps;
  },
  computed: {
    formStyle() {
      if (this.gutter > 0) {
        const gutter = Math.floor(window.parseFloat(this.gutter) / 2);

        return {
          marginLeft: -gutter + "px",
          marginRight: -gutter + "px",
        };
      }
    },
    formItemStyle() {
      if (this.gutter > 0) {
        const gutter = Math.floor(window.parseFloat(this.gutter) / 2);

        return {
          paddingLeft: gutter + "px",
          paddingRight: gutter + "px",
        };
      }
    },
    formItemClass() {
      return [];
    },
  },
};
</script>

<style lang="scss">
.search-form {
  &__wrapper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    &.flex-wrap {
      flex-wrap: wrap;

      .search-form-item {
        margin-bottom: 10px;
      }
    }
  }

  &-item {
    display: flex;
    align-items: center;
  }

  .form-item__label {
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
  }

  .label-suffix {
    white-space: pre;
    margin: 0 5px;
  }
}
</style>
