<template>
  <div>
    <component :is="name" />
  </div>
</template>

<script>
import Admin from "./views/Admin.vue";
import AdminByPageContent from "./views/AdminByPageContent.vue";

export default {
  name: "App",
  data() {
    return {
      name: "AdminByPageContent",
    };
  },
  components: { Admin, AdminByPageContent },
  methods: {},
  mounted() {},
};
</script>

<style>
.danger-color {
  color: red;
}

.waring-color {
  color: yellow;
}
</style>
