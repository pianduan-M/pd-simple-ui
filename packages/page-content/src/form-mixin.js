import { isFunction, isString, isObject } from "../../../src/utils/is"

export default {
  data() {
    return {
      initFormData: {},
      visible: false,
      formData: {},
      saveBtnLoading: false
    }
  },
  created() {
    this.mapFormItems()
  },
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
      if (this.beforeEditFormatter && isFunction(this.beforeEditFormatter)) {
        row = this.beforeEditFormatter(row)
      }
      this.initFormData = { ...row }
      this.visible = true
    },
    // 处理表单保存
    async handleSave() {
      let formData

      // 表单校验
      try {
        await this.$refs.formRef.validate()
      } catch (error) {
        return this.$emit("on-form-validate-error", error)
      }

      // 如果表单保存前处理方法，返回值作为请求数据，可以算是保存前最后的数据格式化
      if (this.beforeSaveHelper && !isFunction(this.beforeSaveHelper)) {
        try {
          const res = await this.beforeSaveHelper(this.formData)
          if (res && isObject(res)) {
            formData = res
          }
        } catch (error) {
          return
        }
      }

      if (!formData) {
        formData = { ...this.formData }
      }

      let requestHelper
      if (formData.id) {
        requestHelper = this.fetch.edit
      } else {
        requestHelper = this.fetch.add
      }

      if (!requestHelper) {
        throw new Error("需要提供请求方法或者请求路径")
      }

      this.saveBtnLoading = true

      const result = this._request(requestHelper, { data: formData, method: formData.id ? 'put' : 'post' })

      if (result) {
        result.then(() => {
          this.$message.success('保存成功')
          this.getTableDataList()
          this.$emit("save-form-success")
          this.visible = false
          this.saveBtnLoading = false
        }, err => {
          this.$message.error(err.message)
          this.$emit("save-form-error", err)
          this.saveBtnLoading = false
        })
      }

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
      console.log(id, 'id');

      const result = this._request(deleteFetch, { params: { id }, method: "delete" })
      if (result) {
        result.then(() => {
          this.$emit('on-delete-success', id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.recalculatePageNum(String(id).split(",").length)
          this.getTableDataList()
        }, err => {
          this.$message({
            type: 'error',
            message: err.message || '删除失败，请稍后重试'
          });
          this.$emit('on-delete-error', err)
        })
      }
    },
    // 根据表单配置项绑定key
    mapFormItems(data = {}) {
      this.formItems.map(item => {
        if (item.prop) {
          this.$set(this.formData, item.prop, data[item.prop])
        }
      })
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
