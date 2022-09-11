

export function debounce(callback, delay, immediate) {
  let timeoutId, lastExec = 0

  function wrapper(...arguments_) {
    let self = this

    function clearExistingTimeout() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }

    function clear() {
      if (timeoutId) {
        timeoutId = undefined;
      }
    }

    if (!timeoutId && immediate) {
      exec()
    }

    clearExistingTimeout();

    timeoutId = setTimeout(
      immediate ? clear : exec,
      delay
    );
  }

  return wrapper
}
