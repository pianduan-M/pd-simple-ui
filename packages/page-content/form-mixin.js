import { isFunction, isString } from "../../src/utils/is"


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
          this.handleDeleteByItem(row)
          break;
        default:
          this.$emit(`on-${item.key}`, row)
      }
    },
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
    handleDeleteByItem(row) {
      // 如果有处理删除的方法
      if (this.onTableColumnDelete && isFunction(onTableColumnDelete)) {
        this.onTableColumnDelete(row, this.getTableDataList)
      } else {
        if (!this.$confirm) {
          return new Error("not this.$confirm")
        }
        this.$confirm(this.deleteConfirmText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDeleteTableColumnRequest(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    handleDeleteTableColumnRequest(row) {
      const deleteFetch = this.fetch.delete
      if (!deleteFetch) {
        throw new Error("需要提供请求方法或者请求路径")
      }
      const result = this._request(deleteFetch, { params: { id: row.id } })
      if (result) {
        result.then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }, err => {
          this.$message({
            type: 'error',
            message: err.message || '删除失败，请稍后重试'
          });
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
