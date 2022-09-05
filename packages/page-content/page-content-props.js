

export const pageContentProps = {
  searchFormItems: {
    type: Object,
    default: () => []
  },
  tableColumns: {
    type: Object,
    default: () => []
  },
  formItems: {
    type: Object,
    default: () => []
  },
  selectOptionMap: {
    type: Object,
    default: () => ({})
  },
  searchFormParams: {
    type: Object,
    default: () => ({})
  },
  pageData: {
    type: Object,
    default: () => ({
      page: 1,
      size: 10,
      total: 0,
    })
  },
  searchBtnList: {
    type: Object,
    default: () => ['search', 'add']
  },
  size: {
    type: Object,
    default: 'small'
  }
}
