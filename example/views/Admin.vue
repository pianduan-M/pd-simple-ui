<template>
  <div style="width: 1600px">
    <PdSearchForm
      :gutter="20"
      label-suffix=":"
      :formItems="searchFormItems"
      input-class="search-input"
      v-model="searchValue"
      :selectOptionMap="selectOptionMap"
    >
      <template #after>
        <el-button size="small" type="primary" @click="onSearch"
          >搜索</el-button
        >
        <el-button size="small" type="primary" @click="handleEditorAdd({})"
          >新增</el-button
        >
      </template>
    </PdSearchForm>

    <br />

    <div>
      <!-- 过滤表格列 -->
      <FilterColumn :columns="tableColumns" :showColumnList.sync="selectList" />
    </div>

    <PdTable
      style="width: 100%"
      :columns="filterTableColumns"
      border
      @selection-change="onSeletionChange"
      :data="tableData"
      :commonColumnOptions="{ align: 'center' }"
      @sort-change="onSortChange"
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
    </PdTable>

    <el-dialog :visible="visible">
      <PdForm
        :formItems="formItems"
        label-width="auto"
        :colLayout="{ span: 24 }"
        v-model="formData"
        :rowAttrs="{ gutter: 50 }"
        ref="formRef"
        :initFormData="initFormData"
        :rules="rules"
        :defaultInputAttrs="{ clearable: true }"
      >
        <template #ageLabel>
          <div>年龄年龄年龄年龄</div>
        </template>

        <template #weight>
          <el-input type="text" v-model="formData.weight" />
        </template>
      </PdForm>

      <template #footer>
        <div class="submit-btns">
          <el-button size="small" type="primary">保存</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import FilterColumn from "../../packages/page-content/FilterColumn.vue";
import { tableColumns } from "./config/table.config";
import { formItems, searchFormItems } from "./config/form.config";
import axios from "axios";

export default {
  name: "user",

  provide() {
    return {
      dialogVisible: () => this.visible,
    };
  },
  data() {
    this.tableColumns = tableColumns;
    this.formItems = formItems;
    this.searchFormItems = searchFormItems;
    return {
      tableData: [],
      formData: {
        name: "",
        age: "",
        height: "",
        gender: "",
        weight: "",
      },
      initFormData: {
        age: 12,
      },
      rules: {
        name: [
          {
            required: true,
            message: "必输项",
            trigger: "blur",
          },
        ],
      },
      searchValue: {
        name: "",
        age: "",
      },
      selectOptionMap: {
        gender: [],
      },
      visible: false,
      selectList: [],
    };
  },

  methods: {
    onSeletionChange() {},
    resetForm() {
      this.initFormData = {};
    },
    handleEditorAdd(row) {
      this.initFormData = row;
      this.visible = true;
    },
    async getPersonList() {
      try {
        const res = await axios.get("/api/person/list");
        this.tableData = res.data.data || [];
      } catch (error) {}
    },
    onSortChange(column, prop, order) {
      console.log(column, prop, order);
    },
    onSearch() {
      console.log(this.searchValue, "searchValue");
    },
  },

  mounted() {
    setTimeout(() => {
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
    }, 2000);

    this.getPersonList();
  },
  watch: {
    searchValue(newVal) {
      console.log(newVal);
    },
  },
  computed: {
    filterTableColumns() {
      const selectList = this.selectList;
      let result = this.tableColumns;
      result = this.tableColumns.filter((item) =>
        selectList.find((label) => label === item.label)
      );
      console.log(result, "result");
      return result;
    },
  },
  components: { FilterColumn },
  created() {
    // 过滤列
    this.tableColumns.map((item) => {
      if (
        (typeof item.show === "boolean" && item.show) ||
        typeof item.show === "undefined"
      ) {
        if (typeof item.label !== "undefined") {
          this.selectList.push(item.label);
        }
      }
    });
  },
};
</script>

<style>
.search-input {
  width: 240px;
}

.submit-btns {
  display: flex;
  justify-content: center;
}
</style>
