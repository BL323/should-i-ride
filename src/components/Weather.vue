<template>
    <div class="weather-container">
        <p class="forecast-date">{{forecast.time | dateDisplay}}</p>
        <p class="forecast-time">{{forecast.time | timeDisplay}}</p>
        <p class="forecast-description">{{ forecast.description }}</p>
        <p class="forecast-tempature">{{ forecast.temp | roundNumberDisplay}} °C</p>
        <p class="forecast-tempatureicon"><font-awesome-icon icon="thermometer-half" /></p>
        <p class="forecast-windspeedicon"><font-awesome-icon  icon="wind" /></p>
        <p class="forecast-windspeed">{{ forecast.windSpeed | roundNumberDisplay }} mph  </p>
        <p class="forecast-icon">
            <img :src="forecast.icon | iconLink" :alt="forecast.description"/>
        </p>
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
        dateDisplay: function(dateTime: Date): string {
            const day = dateTime.getDay();
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            return dateTime.toLocaleString("en-GB", options);
        },
        timeDisplay: function(dateTime: Date): string {
            const day = dateTime.getDay();
            const options = { };
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
.weather-container {
    display: grid;
    max-width: 300px;
    border: 1px solid $card-on-base;
    border-radius: 10px;
    grid-template-columns: 150px 100px 30px;
    grid-template-rows: 30px 40px 50px 50px;
    grid-template-areas:    "hd hd hd"
                            "tm desc desc"
                            "ic tmp tmpic"
                            "ic wnd wndic";
}

.forecast-date {
    grid-area: hd;
}

.forecast-date {
    grid-area: hd;
    text-align: left;
    margin-left: 10px;
}

.forecast-time {
    grid-area: tm;
    font-weight: bold;
}

.forecast-description {
    grid-area: desc;
}

.forecast-tempature {
    grid-area: tmp;
}

.forecast-tempatureicon {
    grid-area: tmpic;
    text-align: left;
}

.forecast-windspeed {
    grid-area: wnd;
}

.forecast-windspeedicon {
    grid-area: wndic;
    text-align: left;
}

.forecast-icon {
    grid-area: ic;
    margin-top: -5px;
}
</style>