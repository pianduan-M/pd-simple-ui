
// 储存全局配置 方法

const pageContentGlobal = {
  // pagination page size total 全局用户自定key
  globalPageParamKey: null,
  // 全局请求方法
  globalRequest: null,
  // 全局响应格式化方法
  responseFormatter: null
}

export const registerGlobalRequest = (request) => {
  pageContentGlobal.globalRequest = request;
}

export const registerGlobalResponseFormatter = (formatter) => {
  pageContentGlobal.responseFormatter = formatter;

}
export const registerGlobalPageParamKey = (keys) => {
  pageContentGlobal.globalPageParamKey = keys;
}

export default pageContentGlobal
