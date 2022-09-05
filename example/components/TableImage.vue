<template>
  <el-popover trigger="hover">
    <template #reference>
      <img :src="row[prop]" alt="" class="preview-image" />
    </template>
    <img :src="row[prop]" class="large-image" alt="" />
  </el-popover>
</template>

<script>
export default {
  name: "TableImage",
  data() {
    return {};
  },
  props: {
    row: Object,
    prop: String,
  },
  components: {},
  methods: {},
  mounted() {
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.large-image {
  width: 500px;
  height: 500px;
}

.preview-image {
  width: 100px;
  height: 100px;
}
</style>
