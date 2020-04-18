<template>
  <div id="app">
    <!-- <font-awesome-icon id="theme-selector" @click="styleIt" icon="circle" /> -->
    <div id="theme-selector" 
        :class="{ 
            'light-theme': !lightMode,
            'dark-theme': lightMode,
        }"
        @click="styleIt" />
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
  },
  data: () => {
      return {
        lightMode: true
      };
  },
  methods: {
      styleIt: function() {
          this.lightMode = !this.lightMode;
          const appElement = document.querySelector("#app");
        
          if(this.lightMode) {
            document.body.style.background = "white";
            appElement?.setAttribute("style", "color: #2c3e50; background: white");
          }

          if(!this.lightMode) { // dark mode
            document.body.style.background = "#2c3e50";
            appElement?.setAttribute("style", "color: white; background: #2c3e50");
          }
      }
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

.light-theme {
    color: #2c3e50; 
    background: white
}

.dark-theme {
    color: white; 
    background: #2c3e50
}

#theme-selector{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: right;

    &:hover {
        box-shadow: 0 0 0 2px gray;
        transition: .5s ease;
    }
}

</style>
