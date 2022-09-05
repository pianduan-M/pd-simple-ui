

export default {
  methods: {
    getSearchBtnComponent(key) {
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
          return key
      }

    },
    getSearchBtnListeners(item) {
      switch (item.key) {
        case 'search':
          return this.onSearch
        case 'add':
          return this.handleAdd
        case 'edit':
          return this.handleEdit
        case 'delete':
          return this.handleDelete
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
    }
  }
}
