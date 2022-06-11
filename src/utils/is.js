const toString = Object.prototype.toString;

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

export function isNull(val) {
  return val === null;
}

export function isObject(val) {
  return !isNull(val) && is(val, "Object");
}

export function isFunction(val) {
  return typeof val === "function";
}

export function isString(val) {
  return typeof val === "string";
}

export function isArray(val) {
  return val && Array.isArray(val);
}

export function isUndef(val) {
  return typeof val === "undefined";
}
