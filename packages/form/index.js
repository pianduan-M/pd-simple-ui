import PdForm from "./form.vue";

PdForm.install = function (Vue) {
  Vue.component(PdForm.name, PdForm);
};

export default PdForm;
