import fetch from "node-fetch";

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

function convertToLocalTime(unixTimeStamp: number): Date {
  let date = new Date(unixTimeStamp * 1000);
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);
  return date;
}

function convertMetersPerSecondToMph(mps: number): number {
  return mps * 2.237;
}

function parseForecast(raw: any): Forecast[] {
  const tr = raw.forecast.hourly.map((x: any) => {
    const forecast = {
      timestamp: x.dt,
      time: convertToLocalTime(x.dt),
      windSpeed: convertMetersPerSecondToMph(x.wind_speed),
      temp: x.temp,
      summary: x.weather[0].main,
      description: x.weather[0].description,
      icon: x.weather[0].icon

    } as Forecast;
    return forecast;
  });
  return tr;
}

function parseLocation(raw: any): Location {
  const data = raw.forecast;
  return { 
    latitude: data.lat,
    longitude: data.lon,
    sunrise: convertToLocalTime(data.current.sunrise),
    sunset: convertToLocalTime(data.current.sunset) };
}

async function getForecastAsync(): Promise<LocationForecast> {
  const response = await fetch(".netlify/functions/forecast", {
    headers: { Accept: "application/json" }
  });
  const raw = await response.json();
  const forecast = parseForecast(raw);
  const location = parseLocation(raw);
  return { forecast, location };
}

export { getForecastAsync, Forecast, Location, LocationForecast };
