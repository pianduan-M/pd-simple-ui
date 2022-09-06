import { isObject } from "element-ui/src/utils/types"
import { isFunction, isString } from "../../src/utils/is"
import pageContentGlobal from './global-options.js'

export default {
  data() {

    return {
      selectList: [],
      tableData: [],
      showColumnList: []
    }
  },
  methods: {

    // 获取列表数据
    async getTableDataList() {
      const params = this.getRequestParams()
      const requestList = this.fetch.list
      if (!requestList) {
        throw new Error("需要提供请求方法或者请求路径")
      }
      let result
      // 请求是一个函数
      if (isFunction(requestList)) {
        result = requestList(params)
        // 是 url
      } else if (isString(requestList)) {
        // 调用局部或全局请求方法
        switch (true) {
          case this.request && isFunction(this.request):
            result = this.request({ url: requestList, params })
            break;
          case pageContentGlobal.globalRequest && isFunction(pageContentGlobal.globalRequest):
            result = pageContentGlobal.globalRequest({ url: requestList, params })
            break;
        }
      }

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
      console.log(this.tableData, ' this.tableData');
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
            result.push(slot)
            break;
          case isObject(slot):
            Object.keys(slot).forEach(key => this.handleFilterColumnSlot(slot[key], result))
            break;
        }
      }
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
      console.log(result, 'result');

      // 需要过滤列
      if (this.showFilterColumn) {
        result = this.tableColumns.filter(item => selectList.find(label => label === item.label));
      }

      console.log(result, 'result');
      return result
    }
  }
}
