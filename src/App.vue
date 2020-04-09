<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h2>{{ name }}</h2>
    <h3>Want to hear a joke?</h3>
    <h2>{{ joke }}</h2>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { getMessage, getJoke } from './api/getMessage';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      name: 'Sarah',
      joke: ''
    }
  },
  created: async function() {
    console.log("its here");
    const greeting = await getMessage();
    const joke = await getJoke();
    this.name = `${greeting.message} ${this.name}!`;
    this.joke = joke.msg;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
