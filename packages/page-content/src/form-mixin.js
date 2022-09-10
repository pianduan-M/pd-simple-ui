import { isFunction, isString, isObject } from "../../../src/utils/is"

export default {
  data() {
    return {
      initFormData: {},
      visible: false,
      formData: {},
    }
  },
  created() { },
  methods: {
    getOperateBtnType(item) {
      if (item.type) return item.type
      switch (item.key) {
        case 'view':
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
    handleOperateClick(item, row) {
      switch (item.key) {
        case 'edit':
          this.handleEdit(row)
          break;
        case 'delete':
          this.handleDelete(row)
          break;
        default:
          this.$emit(`on-${item.key}`, row)
      }
    },
    // 处理编辑
    handleEdit(row) {
      console.log(row, 'handleEdit');
      this.initFormData = { ...row }
      this.visible = true
      console.log(this.initFormData, 'initFormData');
    },
    getFormSlotsName() {
      const result = []
      this.formItems.map(item => {
        const slot = item.slotName
        const labelSlot = item.renderLabel
        if (slot) {
          result.push(slot)
        }
        if (labelSlot && isString(labelSlot)) {
          result.push(labelSlot)
        }
      })

      return result
    },
    defineKeyByFormItems(defaultFormValue) {
      this.formItems.map(item => {
        const value = this.getDefaultValueByKey(item.prop, defaultFormValue)
        this.$set(this.formData, item.prop, value)
      })
    },
    getDefaultValueByKey(key, defaultValue = {}) {
      if (!isString(key)) {
        throw new Error("getDefaultValueByKey key must be a string")
      }
      return defaultValue[key]
    },
    // 监听删除
    handleDelete(params) {
      console.log(params, 'params');

      let ids = ''
      if (isObject(params)) {
        ids = params.id
      } else if (isString(params)) {
        ids = params
      }
      if (!ids) return
      // 如果有处理删除的方法
      if (this.onTableColumnDelete && isFunction(onTableColumnDelete)) {
        this.onTableColumnDelete(ids, this.getTableDataList)
      } else {
        if (!this.$confirm) {
          return new Error("not this.$confirm")
        }
        this.$confirm(this.deleteConfirmText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDeleteTableColumnRequest(ids)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    // 处理删除请求
    handleDeleteTableColumnRequest(id) {
      const deleteFetch = this.fetch.delete
      if (!deleteFetch) {
        throw new Error("需要提供请求方法或者请求路径")
      }
      const result = this._request(deleteFetch, { params: { id }, method: "delete" })
      if (result) {
        result.then(() => {
          this.$emit('on-delete-success', id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.recalculatePageNum(id.split(",").length)
          this.getTableDataList()
        }, err => {
          this.$message({
            type: 'error',
            message: err.message || '删除失败，请稍后重试'
          });
          this.$emit('on-delete-error', err)
        })
      }
    }

  },
  computed: {
    dialogTitle() {
      let result = this.dialogTitleList.add
      if (this.initFormData.id) {
        result = this.dialogTitleList.edit
      }
      return result
    }
  }
}
