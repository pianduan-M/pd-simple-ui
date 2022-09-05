import { isFunction, isString } from "../../src/utils/is"

export default {

  methods: {
    getTableSlotName() {
      const result = []
      this.tableColumns.map(item => {
        if (item.slot && isString(slot)) {
          result.push(item.slot)
        } else if (item.labelSlotName) {
          result.push(item.labelSlotName)
        }
      })
      return result
    }
  }
}
