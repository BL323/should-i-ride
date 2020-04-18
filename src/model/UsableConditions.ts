import { Forecast, UsableCondition } from "../model/models";

const conditions: UsableCondition = {
  maxTemp: 35,
  minTemp: 4,
  maxWindSpeed: 20
};

const isValidMinTempFn = function(
  temp: number,
  minTemp: number | null
): boolean {
  if (minTemp === null) return true;

  return Math.round(temp) > minTemp;
};

const isValidMaxTempFn = function(
  temp: number,
  maxTemp: number | null
): boolean {
  if (maxTemp === null) return true;
  return Math.round(temp) <= maxTemp;
};

const isValidWindSpeedFn = function(
  windSpeed: number,
  maxWindSpeed: number | null
): boolean {
  if (maxWindSpeed == null) return true;
  return Math.round(windSpeed) <= maxWindSpeed;
};

const isValidWeatherFn = function(
  description: string
): boolean {
  if (
    description === "Rain" ||
    description === "Snow" ||
    description === "Thunderstorm" ||
    description === "Fog" ||
    description === "Mist"
  )
    return false;

  return true;
};

const canIRideFn = function(
  forecast: Forecast,
  conditions: UsableCondition
): boolean {
  if (forecast == null) throw new Error("A valid forecast must be supplied");
  if (conditions == null)
    throw new Error("A valid set of conditions must be supplied.");

  if (!isValidMinTempFn(forecast.temp, conditions.minTemp)) return false;
  if (!isValidMaxTempFn(forecast.temp, conditions.maxTemp)) return false;
  if (!isValidWindSpeedFn(forecast.windSpeed, conditions.maxWindSpeed))
    return false;
  if (!isValidWeatherFn(forecast.summary))
    return false;
  return true;
};

export {
  conditions,
  canIRideFn,
  isValidMinTempFn,
  isValidMaxTempFn,
  isValidWindSpeedFn,
  isValidWeatherFn
};
