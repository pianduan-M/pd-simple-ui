import { isObject, isArray, isString } from "./is";
const hasOwnProperty = Object.prototype.hasOwnProperty;


export function createEventsObj(eventObj = {}, row) {
  if (!eventObj) return {};
  const events = {};
  Object.keys(eventObj).map((key) => {
    events[key] = ($event) => {
      eventObj[key].call(this, row, $event);
    };
  });
  return events;
}

/**
 *
 * @param {function} h  vue createElement
 * @param {object} option  生成 dom 的配置项
 * @param {object} rowData 表格行数据
 */

export function createElementByElType(h, option, rowData) {
  if (!option.key) {
    throw new Error("createElementByElType option row key is required");
  }
  switch (true) {
    case option.elType === "image":
      const src = option.formatter
        ? handleFormatter(option.formatter, rowData)
        : formatRowDataByKey(option.key, rowData);
      return h("img", {
        on: createEventsObj.call(this.$parent, option.on, rowData),
        attrs: {
          src,
        },
        class: option.class,
        style: option.style,
      });
  }
}

function handleFormatter(formatter, rowData) {
  if (typeof formatter === "function") {
    return formatter(rowData);
  } else {
    return formatter;
  }
}

export function formatRowDataByKey(key, row) {
  if (typeof key !== "string") {
    throw new TypeError("column prop must be a string");
  }

  function hander(keys, row) {
    let result;
    const firstKey = keys.shift();
    result = row[firstKey];
    if (keys.length > 0) {
      result = hander(keys, result);
    }
    return result;
  }

  const splitKey = key.split(".");
  if (splitKey.length === 1) {
    return row[splitKey[0]];
  } else {
    try {
      return hander(splitKey, row);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export function merge(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).map((sourceKey) => {
      let targetVal = target[sourceKey];
      let sourceVal = source[sourceKey];
      // 如果没有
      if (!targetVal) {
        targetVal = sourceVal;
      } else if (isObject(targetVal) && isObject()) {
        target[sourceKey] = merge(targetVal, sourceVal);
      } else if (isArray(targetVal) && isArray(sourceVal)) {
        target[sourceKey] = [...targetVal, ...sourceVal];
      }
    });
  }

  return target;
}

export const getSelectOptions = (column, map = {}) => {
  let options = [];
  if (isArray(column.options)) {
    options = column.options;
  } else if (isString(column.options)) {
    options = map[column.options] || [];
  }

  return options;
};

export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}



export function noop() { };

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
