import PageContent from "./src/PageContent.vue";

PageContent.install = function (Vue) {
  Vue.component(PageContent.name, PageContent);
};

export default PageContent;
