import { isString } from "../../src/utils/is"


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
