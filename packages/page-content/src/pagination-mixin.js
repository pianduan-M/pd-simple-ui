import { isObject } from '../../../src/utils/is'
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
    // 删除后重新计算 page number
    recalculatePageNum(length) {
      const total = this.pageValue[this.pageMapKeys.total]
      if (total <= 0) return
      const page = this.pageValue[this.pageMapKeys.page]
      const size = this.pageValue[this.pageMapKeys.size]
      let totalPage = parseInt(total / size, 10)
      const remainder = total % size
      totalPage = remainder > 0 ? ++totalPage : totalPage

      if (page === totalPage && remainder > 0) {
        if (remainder - length <= 0) {
          this.pageValue[this.pageMapKeys.page] = this.pageValue[this.pageMapKeys.page] > 1 ? this.pageValue[this.pageMapKeys.page] - 1 : 1
        }
      }
    }
  }
}
