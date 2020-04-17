<template>
    <div class="container">
        <div id="main-content">

            <h2>Should I Ride?</h2>
            <transport id="transport" />
            <location />
            <overview />
            <forecast />
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
import Overview from "./Overview.vue";

export default Vue.extend({
    components: { Transport, Forecast, Location, Overview }
})
</script>

<style lang="scss" scoped>
h2 {
    margin: 0px;
}

.container {
    display: grid;
    grid-template-columns: 5% auto 5%;
    grid-template-rows: 10px auto 5px; 
    grid-template-areas: "hd hd hd"
                         "col1 main col2"
                         "ft ft ft";
    max-width: 500px;
    margin: auto;
   }

@media (min-width: $small-screen) {
.container {
    grid-template-columns: 15% auto 15%;
}
}

#main-content {
    grid-area: main;
    margin: auto;
}

#footer {
    grid-area: ft;
    background: $accent-colour;
    line-height: 5px;
}
</style>