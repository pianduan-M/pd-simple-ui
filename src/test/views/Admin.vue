<template>
  <div>
    <PdSearchForm
      :gutter="20"
      label-suffix=":"
      :formItems="searchFormItems"
      input-class="search-input"
      v-model="searchValue"
      :selectOptionMap="selectOptionMap"
    >
      <template #after>
        <el-button size="small" type="primary">搜索</el-button>
        <el-button size="small" type="primary" @click="handleEditorAdd({})"
          >新增</el-button
        >
      </template>
    </PdSearchForm>

    <br />

    <PdTable
      :columns="tableColumns"
      border
      @selection-change="onSeletionChange"
      :data="tableData"
      :commonColumnOptions="{ align: 'center' }"
    >
      <template #operate="{ row }">
        <el-button type="text" @click="handleEditorAdd(row)">编辑</el-button>
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
import { tableColumns } from "./config/table.config";
import { formItems, searchFormItems } from "./config/form.config";
import axios from "axios";

export default {
  name: "user",
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
    };
  },

  methods: {
    onSeletionChange() {
      // console.log("onSeletionChange");
    },
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
        console.log(res, "res");
        this.tableData = res.data.data || [];
      } catch (error) {}
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
