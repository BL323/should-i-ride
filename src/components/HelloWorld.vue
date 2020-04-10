<template>
  <div class="hello">
    <h1>{{greeting}}, {{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import fetch from "node-fetch";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: () => {
    return {
      greeting: '',
    };
  },
  created: async function() {
    const response = await fetch('.netlify/functions/yo', {
      headers: { Accept: 'application/json' }
    });
    const greeting = await response.json();
    this.greeting = greeting.message;
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
