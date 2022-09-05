<template>
  <div>
    <div class="search-form-box">
      <PdSearchForm
        :gutter="20"
        label-suffix=":"
        :formItems="searchFormItems"
        input-class="search-input"
        v-model="searchValue"
        :selectOptionMap="selectOptionMap"
      >
        <!-- 透传 slot 给search-form -->
        <template v-for="slot in getSearchFormItemSlotName()" #[slot]="data">
          <slot name="slot" v-bind="data" />
        </template>

        <!-- 定义search form 后面的操作按钮 -->
        <template #after>
          <component
            v-for="item in searchBtnList"
            :is="getSearchBtnComponent(item.key)"
            @click="getSearchBtnListeners(item)"
            :key="item.key"
            :size="size"
            :type="getSearchBtnType(item)"
          />
          <slot name="search-btn"></slot>
        </template>
      </PdSearchForm>

      <!-- 右侧查看更多按钮 -->
      <div class="show-more-btn">
        <slot name="more-btn">
          <el-link type="primary"></el-link>
        </slot>
      </div>
    </div>

    <br />

    <PdTable
      style="width: 100%"
      :data="tableData"
      :columns="tableColumns"
      border
      :commonColumnOptions="{ align: 'center' }"
      v-bind="this.$listeners"
    >
    <!-- 透传 slot 给 table 组件 -->
      <template v-for="slot in getSearchFormItemSlotName()" #[slot]="data">
        <slot name="slot" v-bind="data" />
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
import { pageContentProps } from "./page-content-props";
import search from "./search-mixin.js";

export default {
  mixins: [search],
  name: "pageContent",
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
  props: {
    ...pageContentProps,
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
};
</script>

<style scoped>
.search-input {
  width: 240px;
}

.submit-btns {
  display: flex;
  justify-content: center;
}

.search-form-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
