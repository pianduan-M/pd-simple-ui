import { isObject } from '../../src/utils/is'
import pageContentGlobal from './global-options.js'


export default {
  data() {
    return {
      pageValue: {},
      pageMapKeys: {
        page: 'page',
        size: "size",
        total: "total",
      }
    }
  },
  created() {
    let mapKeys = this.pageMapKeys
    const pageParamKey = this.pageParamKey
    const globalPageParamKey = pageContentGlobal.globalPageParamKey

    // 映射key
    if (pageParamKey && isObject(pageParamKey)) {
      mapKeys = pageParamKey
    } else if (globalPageParamKey && isObject(globalPageParamKey)) {
      mapKeys = globalPageParamKey
    }

    this.pageMapKeys = mapKeys

    // 赋默认值
    Object.keys(mapKeys).forEach(key => {
      const _key = mapKeys[key]
      const value = this.pageData[_key]
      console.log(value, _key, 'paginationOptions');
      this.$set(this.pageValue, _key, value)
    })
  },
  computed: {
    paginationOptions() {
      const { page, size, total, ...rest } = this.pageData
      return rest
    }
  },
  methods: {
    onSizeChange(val) {
      this.pageValue[this.pageMapKeys.size] = val
      this.getTableDataList()
    },
    onCurrentPageChange(val) {
      this.pageValue[this.pageMapKeys.page] = val
      this.getTableDataList()
    },
  }
}
