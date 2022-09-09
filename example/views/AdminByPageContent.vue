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
      :defaultFormData.sync="formData"
      ref="PageContentRef"
      :searchFromAttrs="searchFromAttrs"
      :isSearchFormChangeRequest="true"
    >
      <template #province>
        <span>省份1</span>
      </template>

      <template #provinceHeader>
        <span>省份头部</span>
      </template>

      <template #ageLabel>
        <div>年龄年龄年龄年龄</div>
      </template>

      <template #weight="{ formData }">
        <el-input
          type="text"
          :value="formData.weight"
          @input="onWeightChange"
        />
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
      selectOptionMap: {
        gender: [],
      },
      fetch: {
        list: this.getPersonList,
        delete: "/api/person/list",
      },
      formData: {},
      searchFromAttrs: {
        commonFormProps: { clearable: true },
      },
    };
  },
  components: {},
  methods: {
    getPersonList({ params }) {
      return axios.request({ method: "get", url: "/api/person/list", params });
    },
    // fetchDeletePersonById({ params }) {
    //   const { id } = params;
    //   return axios.request({ method: "del", url: "/api/person/list", params });
    // },

    responseFormatter(res, pageValue) {
      console.log(res, pageValue, "res, pageValue");
      pageValue.total = res.data.total;
      console.log(pageValue, "pageValue");
      return res.data.data;
    },
    handleEditorAdd() {},
    onWeightChange(val) {
      this.$refs.PageContentRef.formData.weight = val;
    },
  },
  mounted() {
    this.selectOptionMap.gender = [
      {
        label: "男",
        value: "man",
      },
      {
        label: "女",
        value: "woman",
      },
    ];
  },
  computed: {},
};
</script>

<style scoped lang="scss"></style>
