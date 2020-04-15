import fetch from "node-fetch";

interface Location {
  lat: number;
  lon: number;
  sunrise: number;
  sunset: number;
}

interface Forecast {
  time: Date;
  windSpeed: number;
  temp: number;
  description: string;
  icon: string;
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

function parseResponse(raw: any): Forecast[] {
  const tr = raw.forecast.hourly.map((x: any) => {
    const forecast = {
      time: convertToLocalTime(x.dt),
      windSpeed: convertMetersPerSecondToMph(x.wind_speed),
      temp: x.temp,
      description: x.weather[0].description,
      icon: x.weather[0].icon

    } as Forecast;
    return forecast;
  });
  return tr;
}

async function getForecastAsync(): Promise<Forecast[]> {
  const response = await fetch(".netlify/functions/forecast", {
    headers: { Accept: "application/json" }
  });
  const raw = await response.json();
  const forecast = parseResponse(raw);
  return forecast;
}

export { getForecastAsync, Forecast };
