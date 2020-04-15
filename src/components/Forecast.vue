<template>
    <div>
        <div v-for="forecast in forecasts" :key="forecast.time">
            <Weather v-bind:forecast="forecast" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Weather from "./Weather.vue";
import { getForecastAsync, Forecast } from "../api/Forecast";

const forecasts: Array<Forecast> = [];

export default Vue.extend({
    components: { Weather },
    data: () => {
        return {
            forecasts
        }
    },
    created: async function() {
        const forecastData: Array<Forecast> = await getForecastAsync();
        this.forecasts = forecastData;
    }
})
</script>

<style lang="scss" scoped>

</style>