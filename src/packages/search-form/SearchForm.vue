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
            v-bind="item.attrs"
            :class="[inputClass, item.class]"
            :value="value[item.prop]"
            v-if="item.type === 'select'"
            v-on="createFormItemEvents(item.on)"
            @change="onInput(item.prop, $event, 'change', item)"
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
            v-bind="item.attrs"
            :class="[inputClass, item.class]"
            :value="value[item.prop]"
            v-else-if="item.type === 'input'"
            v-on="createFormItemEvents(item.on)"
            @input="onInput(item.prop, $event, 'input', item)"
          >
          </el-input>
          <el-date-picker
            v-else-if="item.type === 'date'"
            :size="size"
            v-model="value[item.prop]"
            type="date"
            :class="[inputClass, item.class]"
            v-bind="item.attrs"
            v-on="createFormItemEvents(item.on)"
          ></el-date-picker>
          <component
            v-else-if="item.type"
            :is="item.type"
            v-bind="item.attrs"
            v-model="value[item.prop]"
            :class="[inputClass, item.class]"
            :size="size"
            v-on="createFormItemEvents(item.on)"
            @input="onInput(item.prop, $event, 'input', item)"
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
import { isString, isArray, isObject } from "../../utils/is";
import { createEventsObj } from "../../utils/index";

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
  },

  components: {},
  methods: {
    onInput(prop, value, eventName, formItem) {
      const searchValue = { ...this.value };
      searchValue[prop] = value;
      if (formItem.on && formItem.on[eventName]) {
        formItem.on[eventName].call(this.$parent, value);
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
        return createEventsObj.call(this.$parent, events);
      }
      return {};
    },
  },
  mounted() {},
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

  &__label {
    font-size: 14px;
    font-weight: 400;
  }

  .label-suffix {
    white-space: pre;
    margin: 0 5px;
  }
}
</style>
