<template>
  <div class="filter-column" :class="[filterColumnPosition]">
    <el-popover placement="left" width="200" trigger="click">
      <el-button type="text" slot="reference"
        ><i class="el-icon-setting icon-setting"></i
      ></el-button>
      <el-checkbox-group v-model="filterColumns">
        <div v-for="item in columns" :key="item.label">
          <el-checkbox v-if="item.label" :label="item.label"></el-checkbox>
        </div>
      </el-checkbox-group>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "FilterColumn",
  data() {
    return {
      selectList: [],
    };
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    showColumnList: {
      type: Array,
      default: () => [],
    },
    filterColumnPosition: {
      type: String,
      default: "right",
    },
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {
    filterColumns: {
      get() {
        return this.showColumnList;
      },
      set(val) {
        this.$emit("update:showColumnList", val);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.filter-column {
  float: right;
  top: 0;

  &.left {
    left: 0;
  }
  &.center {
    left: 50%;
    transform: translateX(-50%);
  }
  &.right {
    right: 0;
  }

  .icon-setting {
    font-size: 18px;
  }
}
</style>
