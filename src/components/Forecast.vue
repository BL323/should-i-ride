<template>
    <div>
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
    computed: {
        getLatitude: function() {
            if(location == null || location.latitude == null)
                return '';

            return location.latitude;
        },
        getLongitude: function() {
            if(location == null || location.longitude == null)
                return '';

            return location.longitude;
        }
    },
    created: async function() {
        const LocationForecast: LocationForecast = await getForecastAsync();
        this.location = LocationForecast.location;
        this.forecasts = 
            this.onlyDayLight(
                LocationForecast.forecast,
                this.location.sunrise,
                this.location.sunset);
        
    },
    methods: {
        onlyDayLight: function(
            forecasts: Forecast[],
            sunrise: Date,
            sunset: Date): Forecast[] {
                return forecasts.filter((forecast: Forecast) => {
                    const sunriseHours = sunrise.getHours();
                    const sunsetHours = sunset.getHours();
                    const forecastHours = forecast.time.getHours();
                    return sunriseHours <= forecastHours 
                        && forecastHours <= sunsetHours;
                });
        }
    }
})
</script>

<style lang="scss" scoped>
 .weather-display {
     margin-bottom: 5px;
 }
</style>