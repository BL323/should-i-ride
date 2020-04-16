<template>
    <div>
        <p>Latitude: {{location.latitude}} Longitude: {{location.longitude}} </p>
        <div v-for="forecast in forecasts" :key="forecast.timestamp">
            <weather 
                class="weather-display" 
                v-bind:forecast="forecast" 
                v-bind:sunrise="location.sunrise"
                v-bind:sunset="location.sunset" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Weather from "./Weather.vue";
import { getForecastAsync, LocationForecast, Forecast, Location } from "../api/Forecast";

let location: Location;
const forecasts: Array<Forecast> = [];

export default Vue.extend({
    components: { Weather },
    data: () => {
        return {
            forecasts,
            location
        }
    },
    created: async function() {
        const LocationForecast: LocationForecast = await getForecastAsync();
        this.forecasts = LocationForecast.forecast;
        this.location = LocationForecast.location;
    }
})
</script>

<style lang="scss" scoped>
 .weather-display {
     margin-bottom: 5px;
 }
</style>