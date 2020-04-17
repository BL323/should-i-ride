<template>
  <div>
    <div v-if="isPostSunrise">
      <p class="sun-event">
        <font-awesome-icon icon="sun" />
        Sunrise {{ sunrise | timeDisplay }}
      </p>
    </div>
    <div class="weather-container">
      <p class="forecast-date">{{forecast.time | dateDisplay}}</p>
      <p class="forecast-time">{{forecast.time | timeDisplay}} : {{ forecast.summary }}</p>
      <p class="forecast-description">{{ diffTm }}</p>
      <!-- <p class="forecast-description">{{ forecast.description }}</p> -->
      <p class="forecast-tempature">{{ forecast.temp | roundNumberDisplay}} °C</p>
      <p class="forecast-tempatureicon">
        <font-awesome-icon icon="thermometer-half" />
      </p>
      <p class="forecast-windspeedicon">
        <font-awesome-icon icon="wind" />
      </p>
      <p class="forecast-windspeed">{{ forecast.windSpeed | roundNumberDisplay }} mph</p>
      <p class="forecast-icon">
        <img :src="forecast.icon | iconLink" :alt="forecast.description" />
      </p>
    </div>
    <div v-if="isPreSunset">
      <p class="sun-event">
        <font-awesome-icon icon="moon" />
        Sunset {{ sunset | timeDisplay }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Forecast } from "../api/Forecast";

export default Vue.extend({
  props: {
    forecast: { type: Object },
    sunrise: { type: Date },
    sunset: { type: Date }
  },
  filters: {
    dateDisplay: function(dateTime: Date): string {
      const day = dateTime.getDay();
      const options = { weekday: "long", month: "long", day: "numeric" };
      return dateTime.toLocaleString("en-GB", options);
    },
    timeDisplay: function(dateTime: Date): string {
      const day = dateTime.getDay();
      const options = { hour: "numeric", minute: "numeric" };
      return dateTime.toLocaleTimeString("en-GB", options);
    },
    iconLink: function(icon: string): string {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    },
    roundNumberDisplay: function(raw: number) {
      return Math.round(raw);
    }
  },
  computed: {
    isPostSunrise: function(): boolean {
      const forecastTm = (this.forecast as Forecast).time;
      const sunriseTm = new Date(this.sunrise);
      const diffHours = forecastTm.getHours() - sunriseTm.getHours();
      const diffMinutes = forecastTm.getMinutes() - sunriseTm.getMinutes();
      return (
        (diffHours === 0 && diffMinutes === 0) ||
        (diffHours === 1 && diffMinutes !== 0)
      );
    },
    diffTm: function(): string {
      const forecastTm = (this.forecast as Forecast).time;
      const sunsetTm = new Date(this.sunset);
      const diffHours = sunsetTm.getHours() - forecastTm.getHours() ;
      const diffMinutes = sunsetTm.getMinutes() - forecastTm.getMinutes();
      return `H:${diffHours}, M:${diffMinutes}`;
    },
    isPreSunset: function(): boolean {
      const forecastTm = (this.forecast as Forecast).time;
      const sunsetTm = new Date(this.sunset);
      const diffHours = sunsetTm.getHours() - forecastTm.getHours() ;
      const diffMinutes = sunsetTm.getMinutes() - forecastTm.getMinutes();
      return (
        (diffHours === 0 && diffMinutes === 0) ||
        (diffHours === 0 && diffMinutes !== 0)
      );
    }
  }
});
</script>


<style lang="scss" scoped>
.weather-container {
  display: grid;
  max-width: 300px;
  border: 1px solid $card-on-base;
  border-radius: 10px;
  grid-template-columns: 150px 100px 30px;
  grid-template-rows: 30px 40px 50px 50px;
  grid-template-areas:
    "hd hd hd"
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

.sun-event {
  text-align: left;
  margin-left: 60px;
  font-size: 1.5em;
}
</style>