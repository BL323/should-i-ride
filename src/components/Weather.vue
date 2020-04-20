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
      <div class="headline">
          <p class="forecast-time">{{forecast.time | timeDisplay}}</p>
          <p class="forecast-summary" :class="{'is-invalid': isInvalidWeather }">
          {{ forecast.summary }}</p>
      </div>
      <p class="forecast-description">{{ forecast.description }}</p>
      <p class="forecast-tempature" :class="{'is-invalid': isInvalidTemp}">
          {{ forecast.temp | roundNumberDisplay}} °C</p>
      <p class="forecast-tempatureicon" :class="{'is-invalid': isInvalidTemp}">
        <font-awesome-icon icon="thermometer-half" />
      </p>
      <p class="forecast-windspeed" :class="{'is-invalid': isInvalidWind}">{{ forecast.windSpeed | roundNumberDisplay }} mph</p>
      <p class="forecast-windspeedicon" :class="{'is-invalid': isInvalidWind}">
        <font-awesome-icon icon="wind" />
      </p>
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
import { Forecast } from "../model/Models";
import {
  isValidMinTempFn,
  isValidMaxTempFn,
  isValidWindSpeedFn,
  isValidWeatherFn,
  conditions
} from "../model/UsableConditions";
export default Vue.extend({
  props: {
    forecast: { type: Object },
    sunrise: { type: Date },
    sunset: { type: Date }
  },
  filters: {
    dateDisplay: function(dateTime: Date): string {
      const options = { weekday: "long", month: "long", day: "numeric" };
      return dateTime.toLocaleString("en-GB", options);
    },
    timeDisplay: function(dateTime: Date): string {
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
    isInvalidTemp: function(): boolean {
      return !(isValidMinTempFn(this.forecast.temp, conditions.minTemp)
        && isValidMaxTempFn(this.forecast.temp, conditions.maxTemp));
    },
    isInvalidWind: function(): boolean {
        return !isValidWindSpeedFn(this.forecast.windSpeed, conditions.maxWindSpeed);
    },
    isInvalidWeather: function(): boolean {
        return !isValidWeatherFn(this.forecast.summary);
    },
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
    isPreSunset: function(): boolean {
      const forecastTm = (this.forecast as Forecast).time;
      const sunsetTm = new Date(this.sunset);
      const diffHours = sunsetTm.getHours() - forecastTm.getHours();
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

.headline {
  display: flex;
  grid-area: tm;
  font-weight: bold;
  margin-left: 15px;
}

.forecast-date {
  grid-area: hd;
}

.forecast-time {
  margin-right: 15px;
}

.forecast-summary {
  margin-right: 5px;
}

.forecast-date {
  grid-area: hd;
  text-align: left;
  margin-left: 10px;
}

.forecast-description {
  grid-area: desc;
  margin-top: 10px !important;
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
  margin-top: -15px !important;
}

.sun-event {
  text-align: left;
  margin-left: 60px;
  font-size: 1.5em;
}

.is-invalid {
    color: red;
}
</style>