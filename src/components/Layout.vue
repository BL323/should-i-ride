<template>
    <div class="container">
        <div id="main-content">
            <h2>Should I Ride?</h2>
            <Transport id="transport" />
            <location />
            <Forecast />
        </div>
        <div id="footer">
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Transport from "./Transport.vue";
import Forecast from "./Forecast.vue";
import Location from "./Location.vue";

export default Vue.extend({
    components: { Transport, Forecast, Location }
})
</script>

<style lang="scss" scoped>
h2 {
    margin: 0px;
}

.container {
    display: grid;
    grid-template-columns: 15% 70% 15%;
    grid-template-rows: 10px auto 5px; 
    grid-template-areas: "hd hd hd"
                         "col1 main col2"
                         "ft ft ft";
}

#main-content {
    grid-area: main;
}

#footer {
    grid-area: ft;
    background: $accent-colour;
    line-height: 5px;
}
</style>