<template>
  <el-select :value="modelValue" @change="onChange">
    <el-option
      v-for="item in filterOptions"
      :key="item[valueKey] || item[labelKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    ></el-option>
  </el-select>
</template>

<script>
import { isString } from "element-ui/src/utils/types";
import { ref, onMounted } from "vue";
import { isArray, isFunction } from "../../src/utils/is";

const request = async () => {};
const dictMap = {};

export default {
  name: "PdSelect",
  props: {
    modelValue: {
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    request: {
      type: [String, Function],
      default: "",
    },
    labelKey: {
      default: "label",
    },
    valueKey: {
      default: "value",
    },
    dictKey: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      innerOptions: [],
    };
  },
  created() {},
  methods: {
    onChange(val) {
      this.$emit("update:modelValue", val);
      this.$emit("change", val);
    },
    fetchOptions(asyncOption) {
      let result;
      if (isString(asyncOption)) {
        result = request(asyncOption);
      }

      if (isFunction(asyncOption)) {
        result = asyncOption();
      }

      result.then((res) => {
        const list = res.data || [];
        this.innerOptions = list.map((item) => {
          return {
            [this.labelKey]: item[this.labelKey],
            [this.valueKey]: item[this.valueKey],
          };
        });
      });
    },
  },
  computed: {
    filterOptions() {
      let result = this.options;
      if (this.request || this.dictKey) {
        result = this.innerOptions;
      }
      return result;
    },
  },
  watch: {
    request: {
      handler: this.fetchOptions,
      immediate: true,
    },
    dict: {
      handler(dictKey) {
        const result = dictMap[dictKey];
        if (isFunction(result)) {
          this.fetchOptions(result);
        } else if (isArray(result)) {
          this.innerOptions = result;
        }
      },
      immediate: true,
    },
  },
};
</script>
<script setup></script>

<style scoped lang="scss"></style>
