interface Location {
  latitude: number;
  longitude: number;
  sunrise: Date;
  sunset: Date;
}

interface Forecast {
  timestamp: number;
  time: Date;
  windSpeed: number;
  temp: number;
  summary: string;
  description: string;
  icon: string;
}

interface LocationForecast {
  location: Location;
  forecast: Forecast[];
}

interface UsableCondition {
  minTemp: number | null;
  maxTemp: number | null;
  maxWindSpeed: number | null;
}

export { Location, Forecast, LocationForecast, UsableCondition };