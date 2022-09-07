<template>
  <div>
    <PageContent
      :searchFormItems="searchFormItems"
      :tableColumns="tableColumns"
      :formItems="formItems"
      :selectOptionMap="selectOptionMap"
      :fetch="fetch"
      :responseFormatter="responseFormatter"
      showFilterColumn
      :tableAttrs="{ commonColumnOptions: { align: 'center' } }"
    >
      <template #operate="{ row }">
        <el-button type="text" @click="handleEditorAdd(row)">编辑</el-button>
      </template>

      <template #province>
        <span>省份1</span>
      </template>

      <template #provinceHeader>
        <span>省份头部</span>
      </template>
    </PageContent>
  </div>
</template>

<script>
import { tableColumns } from "./config/table.config";
import { formItems, searchFormItems } from "./config/form.config";
import axios from "axios";

export default {
  name: "AdminByPageContent",
  data() {
    this.tableColumns = tableColumns;
    this.formItems = formItems;
    this.searchFormItems = searchFormItems;

    return {
      selectOptionMap: {},
      fetch: {
        list: this.getPersonList,
      },
    };
  },
  components: {},
  methods: {
    async getPersonList() {
      return axios.get("/api/person/list");
    },
    responseFormatter(res, pageValue) {
      console.log(res, pageValue, "res, pageValue");
      pageValue.total = res.data.total;
      console.log(pageValue, "pageValue");
      return res.data.data;
    },
    handleEditorAdd() {},
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped lang="scss"></style>
