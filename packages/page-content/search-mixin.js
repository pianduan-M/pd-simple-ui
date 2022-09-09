

export default {
  data() {
    return {
      searchValue: {}
    }
  },
  created() {
    // 绑定响应式 赋默认值
    const searchFormParams = this.searchFormParams
    this.searchFormItems.forEach(item => {
      const prop = item.prop
      const value = searchFormParams[prop] || ''
      this.$set(this.searchValue, prop, value)
    })
  },
  methods: {
    getSearchBtnComponent(item) {
      console.log(item, 'getSearchBtnComponent');
      const key = item.key
      switch (key) {
        case 'search':
        case 'add':
        case 'edit':
        case 'delete':
          return 'el-button'
        default:
          return key
      }
    },
    getSearchBtnType(item) {
      if (item.type) return item.type
      switch (item.key) {
        case 'search':
          return 'primary'
        case 'add':
          return 'success'
        case 'edit':
          return 'primary'
        case 'delete':
          return 'danger'
        default:
          return ''
      }

    },
    getSearchBtnListeners(item) {

      switch (item.key) {
        case 'search':
          return this.onSearch(item)
        case 'add':
          return this.handleAdd(item)
        case 'edit':
          return this.handleEdit(item)
        case 'delete':
          return this.handleDelete(item)
        default:
          return () => { }
      }

    },
    getSearchFormItemSlotName() {
      const result = []
      this.searchFormItems.map(item => {
        if (item.slotName) {
          result.push(item.slotName)
        } else if (item.labelSlotName) {
          result.push(item.labelSlotName)
        }
      })
      return result
    },
    onSearch() {
      this.pageValue[this.pageMapKeys.page] = 1
      this.getTableDataList()
    },
    handleAdd() {

    },
    handleEdit() {

    },
    handleDelete() {

    },
    getRequestParams() {
      const pageValue = { ...this.pageValue }
      delete pageValue[this.pageMapKeys.total]
      return { ...pageValue, ...this.searchValue }
    },
    handleSearchFormInput() {
      this.getTableDataList()
    },

  },
  computed: {
    searchFormListeners() {
      const result = {}
      if (this.isSearchFormChangeRequest) {
        result.input = this.handleSearchFormInput
      }
      return result
    }
  }
}
