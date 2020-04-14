<template>
    <div class="container">
        <div id="main-content">
            <h2>Should I Ride?</h2>
            <Transport id="transport" />
        </div>
        <div id="footer"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Transport from "./Transport.vue"

export default Vue.extend({
    components: { Transport }
})
</script>

<style lang="scss" scoped>

.container {
    display: grid;
    grid-template-columns: 15% 70% 15%;
    grid-template-rows: 10px auto 10px; 
    grid-template-areas: "hd hd hd"
                         "col1 main col2"
                         "ft ft ft";
}

#main-content {
    grid-area: main;
}

#footer {
    grid-area: ft;
    height: 10px;
    background: $footer-colour;
}
</style>