import SearchForm from "./SearchForm.vue";


SearchForm.install = function (app) {
  app.component(SearchForm.name, SearchForm);
};

export default SearchForm