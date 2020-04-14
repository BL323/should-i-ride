<template>
    <p>
        {{ forecasts }}
    </p>
</template>

<script lang="ts">
import Vue from "vue";
import { getForecastAsync, Forecast } from "../api/Forecast";

const forecasts: Array<Forecast> = [];

export default Vue.extend({
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