<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "./components/Layout.vue"

export default Vue.extend({
  name: "App",
  components: {
    Layout
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $on-base-colour;
  background: $base-colour;
  margin-top: 60px;
}
</style>
