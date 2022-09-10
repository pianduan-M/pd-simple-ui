import PdForm from "./src/form.vue";

PdForm.install = function (Vue) {
  Vue.component(PdForm.name, PdForm);
};

export default PdForm;
