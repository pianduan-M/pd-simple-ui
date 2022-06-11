import PdForm from "./form";

PdForm.install = function (app) {
  app.component(PdForm.name, PdForm);
};

export default PdForm;
