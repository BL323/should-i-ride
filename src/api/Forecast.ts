import fetch from "node-fetch";

interface Location {
  lat: number,
  lon: number,
  sunrise: number,
  sunset: number
}

interface Forecast {
  time: string;
  wind_speed: number;
  temp: number;
}

async function getForecastAsync(): Promise<Forecast[]> {
  const response = await fetch(".netlify/functions/forecast", {
    headers: { Accept: "application/json" }
  });
  const raw = await response.json();
  const forecast = parseResponse(raw);
  return forecast;
}

function parseResponse(raw: any): Forecast[] {

  const tr = raw.forecast.hourly.map((x: any) => <Forecast>{
    time: x.dt,
    wind_speed: x.wind_speed,
    temp: x.temp
  });
  return tr;
}

export { getForecastAsync, Forecast };
