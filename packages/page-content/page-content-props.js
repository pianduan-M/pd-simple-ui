

export const pageContentProps = {
  // 搜索配置项
  searchFormItems: {
    type: Array,
    default: () => []
  },
  // 表格配置项
  tableColumns: {
    type: Array,
    default: () => []
  },
  // 新增编辑配置项
  formItems: {
    type: Array,
    default: () => []
  },
  // 表单默认值
  defaultFormData: {
    type: Object,
    default: () => ({})
  },
  // select options 异步对象 需要异步获取 option 使用改配置
  selectOptionMap: {
    type: Object,
    default: () => ({})
  },
  // 搜索默认值
  searchFormParams: {
    type: Object,
    default: () => ({})
  },
  // 是否搜索表单改变后立即发送请求
  isSearchFormChangeRequest: {
    type: Boolean,
    default: false
  },
  // 页面配置
  pageData: {
    type: Object,
    default: () => ({
      page: 1,
      size: 10,
      total: 0,
      pageSizes: [10, 20, 50, 100],
      background: true,
      small: false,
      layout: "prev, pager, next, sizes"
    })
  },
  // 搜索表单后面按钮
  searchBtnList: {
    type: Array,
    default: () => [{
      key: 'search',
      name: "搜索"
    }, {
      key: "add",
      name: "新增"
    }]
  },
  // 全局表单尺寸，会被单个项覆盖
  size: {
    type: String,
    default: 'small'
  },
  // 是否启用过滤表格列
  showFilterColumn: {
    type: Boolean,
    default: false
  },
  // 请求对象 需要实现 list edit delete 等 可以是方法也可以请求路径
  fetch: {
    type: Object,
    default: () => ({})
  },
  // pagination 参数映射 key
  pageParamKey: {
    type: Object,
    default: null
  },
  // ajax 请求函数 当 fetch 参数为 url 时调用
  request: Function,
  // 列表响应成功后格式化方法
  responseFormatter: Function,
  // 显示查看更多按钮
  showMoreBtn: false,
  // 传递给 PdTable 组件
  tableAttrs: {
    type: Object,
    default: () => ({})
  },
  // 传递给 PdForm 组件
  formAttrs: {
    type: Object,
    default: () => ({})
  },
  // 传递给 PdSearchForm 组件
  searchFromAttrs: {
    type: Object,
    default: () => ({})
  },
  // pagination position
  paginationPosition: {
    type: String,
    default: 'center'
  },
  // 使用编辑新增表单
  showForm: {
    type: Boolean,
    default: true
  },
  // 弹窗标题
  dialogTitleList: {
    type: Object,
    default: () => ({
      edit: '编辑',
      add: '新增'
    })
  },
  // el-dialog props
  dialogAttrs: {
    type: Object,
    default: () => ({})
  },
  // 自动生成操作列的按钮列表
  operateBtnList: {
    type: Array,
    default: () => [
      {
        name: "编辑",
        key: 'edit',
      },
      {
        name: "删除",
        key: 'delete',
      },
    ]
  },
  onTableColumnDelete: {
    type: Function,
    default: null
  },
  deleteConfirmText: {
    type: String,
    default: '此操作将永久删除, 是否继续?'
  }
}

