<template>
  <div><Admin /></div>
</template>

<script>
import Admin from "./views/Admin.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: { Admin },
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
