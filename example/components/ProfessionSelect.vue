<template>
  <el-select :value="value" @change="onChange" v-bind="$attrs">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "Profession",
  data() {
    this.options = [
      {
        label: "开发",
        value: 1,
      },
      {
        label: "产品",
        value: 2,
      },
      {
        label: "测试",
        value: 3,
      },
      {
        label: "UI",
        value: 4,
      },
      {
        label: "运营",
        value: 5,
      },
    ];
    return {};
  },
  props: {
    value: [String, Number],
  },
  components: {},
  methods: {
    onChange(val) {
      this.$emit("input", val);
    },
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped lang="scss"></style>
