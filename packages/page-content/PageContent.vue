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
        :size="size"
        v-bind="searchFromAttrs"
      >
        <!-- 透传 slot 给search-form -->
        <template v-for="slot in getSearchFormItemSlotName()" #[slot]="data">
          <slot :name="slot" v-bind="data" />
        </template>

        <!-- 定义search form 操作按钮 -->
        <template #after>
          <el-button
            v-for="item in searchBtnList"
            @click="getSearchBtnListeners(item)"
            :key="item.key"
            :size="size"
            :type="getSearchBtnType(item)"
            >{{ item.name }}</el-button
          >
          <slot name="search-btn"></slot>
        </template>
      </PdSearchForm>

      <!-- 右侧查看更多按钮 -->
      <div class="show-more-btn" v-if="showMoreBtn">
        <slot name="more-btn">
          <el-link type="primary">查看更多 </el-link>
        </slot>
      </div>
    </div>

    <br />
    <div>
      <div class="table-desc">
        <!-- 过滤表格列 -->
        <FilterColumn
          :columns="tableColumns"
          :showColumnList.sync="selectList"
        />
      </div>

      <PdTable
        style="width: 100%"
        v-bind="tableAttrs"
        :data="tableData"
        border
        :columns="filterTableColumns"
      >
        <!-- 透传 slot 给 table 组件 -->
        <template v-for="slot in getTableSlotName(tableColumns)" #[slot]="data">
          <slot :name="slot" v-bind="data" />
        </template>
      </PdTable>

      <!-- 页码 -->
      <div>
        <el-pagination
          v-bind="paginationOptions"
          :total="pageValue[pageMapKeys.total]"
          :page-size="pageValue[pageMapKeys.size]"
          :current-page="pageValue[pageMapKeys.page]"
          @size-change="onSizeChange"
          @current-change="onCurrentPageChange"
          @prev-click="onCurrentPageChange"
          @next-click="onCurrentPageChange"
        >
        </el-pagination>
      </div>
    </div>
    <!--
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
        v-bind="searchFromAttrs"
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
    </el-dialog> -->
  </div>
</template>

<script>
import { pageContentProps } from "./page-content-props";
import FilterColumn from "./FilterColumn.vue";
import searchMixin from "./search-mixin.js";
import tableMixin from "./table.mixin.js";
import paginationMixin from "./pagination-mixin.js";

export default {
  mixins: [searchMixin, tableMixin, paginationMixin],
  name: "PageContent",
  data() {
    return {
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

      visible: false,
    };
  },
  props: {
    ...pageContentProps,
  },
  components: { FilterColumn },
  methods: {},

  mounted() {},
  watch: {},
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

.table-desc {
  position: relative;
}
</style>
