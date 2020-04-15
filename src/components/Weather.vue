<template>
    <div>
        <p>{{forecast.time | dateTimeDisplay}}: {{ forecast.description }}</p>
        <p>{{ forecast.temp | roundNumberDisplay}}°C</p>
        <p>{{ forecast.windSpeed | roundNumberDisplay }} mph</p>
        <img :src="forecast.icon | iconLink" :alt="forecast.description"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Forecast } from "../api/Forecast";

export default Vue.extend({
    props: {
        forecast: { type: Object }
    },
    filters: {
        dateTimeDisplay: function(dateTime: Date): string {
            const day = dateTime.getDay();
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            return dateTime.toLocaleTimeString("en-GB", options);
        },
        iconLink: function(icon: string): string {
            return `http://openweathermap.org/img/wn/${icon}@2x.png`;
        },
        roundNumberDisplay: function(raw: number) {
            return Math.round(raw);
        }
    }
})
</script>


<style lang="scss" scoped>

</style>