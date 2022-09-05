
export class eventBus {
  constructor() {
    this.eventList = {}
  }

  on(eventName, callback) {
    this.eventList[eventName] = this.eventList[eventName] || []
    this.eventList[eventName].push(callback)
  }

  off(eventName, callback) {
    const callbacks = this.eventList[eventName]
    const existingIndex = callbacks.findIndex(item => item === callback)
    if (existingIndex >= 0) {
      callbacks.splice(existingIndex, 1)
    }
  }

  emit(eventName, payload) {
    const callbacks = this.eventList[eventName]
    if (callbacks) {
      callbacks.forEach(async (callback) => {
        try {
          payload = callback(payload)
        } catch (error) {
          throw new Error(`eventBus ${eventName} ${error}`)
        }
      })
    }

    return payload
  }

}
