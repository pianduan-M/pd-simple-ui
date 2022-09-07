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
        <!-- 操作列 -->
        <template #operate="{ row }" v-if="showForm">
          <el-link
            v-for="item in operateBtnList"
            :key="item.key"
            :type="getOperateBtnType(item)"
            @click="handleOperateClick(item, row)"
            >{{ item.name }}</el-link
          >
        </template>

        <!-- 透传 slot 给 table 组件 -->
        <template v-for="slot in getTableSlotName(tableColumns)" #[slot]="data">
          <slot :name="slot" v-bind="data" />
        </template>
      </PdTable>

      <!-- 页码 -->
      <div class="pagination-container" :class="[paginationPosition]">
        <el-pagination
          :size="size"
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

    <el-dialog
      :visible="visible"
      :title="dialogTitle"
      v-bind="dialogAttrs"
      v-if="showForm"
    >
      <PdForm
        :formItems="formItems"
        label-width="auto"
        :colLayout="{ span: 24 }"
        v-model="formData"
        :rowAttrs="{ gutter: 50 }"
        ref="formRef"
        :initFormData="initFormData"
        v-bind="searchFromAttrs"
      >
        <!-- 透传 slot 给 form 组件 -->
        <template v-for="slot in getFormSlotsName()" #[slot]>
          <slot :name="slot" :formData="formData" />
        </template>
      </PdForm>

      <template #footer>
        <slot name="dialog-footer">
          <div class="submit-btns">
            <el-button size="small" type="primary">保存</el-button>
            <el-button size="small" @click="visible = false">取消</el-button>
          </div>
        </slot>
      </template>

      <!-- dialog 默认插槽 -->
      <slot name="dialog-default"></slot>

      <!-- dialog 标题插槽 -->
      <template #title>
        <slot name="dialog-title"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { pageContentProps } from "./page-content-props";
import FilterColumn from "./FilterColumn.vue";
import searchMixin from "./search-mixin.js";
import tableMixin from "./table.mixin.js";
import paginationMixin from "./pagination-mixin.js";
import formMixin from "./form-mixin.js";

export default {
  mixins: [searchMixin, tableMixin, paginationMixin, formMixin],
  name: "PageContent",
  provide() {
    return {
      dialogVisible: () => this.visible,
    };
  },
  data() {
    return {};
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

<style scoped lang="scss">
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

.pagination-container {
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;

  &.left {
    justify-content: flex-start;
  }
  &.center {
    justify-content: center;
  }
  &.left {
    justify-content: flex-end;
  }
}
</style>
