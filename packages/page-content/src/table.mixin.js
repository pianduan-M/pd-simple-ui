import { isFunction, isString, isObject } from "../../../src/utils/is"
import pageContentGlobal from './global-options.js'
import { isNativeColumnType } from '../../table/src/column-type'

export default {
  data() {
    this.tableSelectionList = []
    return {
      selectList: [],
      tableData: [],
      showColumnList: [],

    }
  },

  methods: {
    _request(requestHandle, requestOptions = {}) {
      let result
      // 请求是一个函数
      if (isFunction(requestHandle)) {
        result = requestHandle(requestOptions)
        // 是 url
      } else if (isString(requestHandle)) {
        // 调用局部或全局请求方法
        switch (true) {
          case this.request && isFunction(this.request):
            result = this.request({ ...requestOptions, url: requestHandle, })
            break;
          case pageContentGlobal.globalRequest && isFunction(pageContentGlobal.globalRequest):
            result = pageContentGlobal.globalRequest({ ...requestOptions, url: requestHandle, })
            break;
        }
      }
      return result
    },
    // 获取列表数据
    async getTableDataList() {
      const params = this.getRequestParams()

      const requestList = this.fetch.list
      if (!requestList) {
        throw new Error("需要提供请求方法或者请求路径")
      }

      const result = this._request(requestList, { params })

      if (result) {
        result.then(this.handleTableDataResponse, err => console.log(err))
      }

    },
    // 处理成功请求
    handleTableDataResponse(res) {

      switch (true) {
        case this.responseFormatter && isFunction(this.responseFormatter):
          this.tableData = this.responseFormatter(res, this.pageValue)
          break;
        case pageContentGlobal.responseFormatter && isFunction(pageContentGlobal.responseFormatter):
          this.tableData = pageContentGlobal.responseFormatter(res, this.pageValue)
          break;
        default:
          this.tableData = res.data || []
          this.pageValue[this.pageMapKeys.total] = res.total || 0
          break;
      }
      this.$emit("on-request-list-success", this.tableData)
    },
    getTableSlotName(columns) {
      const result = []
      columns.map(item => {
        const slot = item.slot
        if (slot) {
          this.handleFilterColumnSlot(slot, result)
        }
        if (item.children) {
          result.push(...this.getTableSlotName(item.children))
        }
      })
      return result
    },
    handleFilterColumnSlot(slot, result = []) {
      if (slot) {
        switch (true) {
          case isString(slot):
            if (this.showForm && slot === 'operate') return
            result.push(slot)
            break;
          case isObject(slot):
            Object.keys(slot).forEach(key => this.handleFilterColumnSlot(slot[key], result))
            break;
        }
      }
    },
    // onSelectionChange
    onSelectionChange(selection) {
      this.tableSelectionList = selection
      this.$emit('selection-change', selection)
    }
  },
  created() {
    // 过滤列
    this.tableColumns.map(item => {
      if ((typeof item.show === 'boolean' && item.show) || typeof item.show === 'undefined') {
        if (typeof item.label !== 'undefined') {
          this.selectList.push(item.label)
        }
      }
    })

  },
  computed: {
    filterTableColumns() {
      const selectList = this.selectList
      let result = this.tableColumns
      // 需要过滤列
      if (this.showFilterColumn) {
        result = this.tableColumns.filter(item => selectList.find(label => {
          if (isNativeColumnType(item.type)) return true
          return label === item.label
        }));
      }
      return result
    }
  },
  mounted() {
    this.getTableDataList()
  },
}
