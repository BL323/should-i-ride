import { Forecast, UsableCondition } from "../model/models";

const conditions: UsableCondition = {
  maxTemp: 35,
  minTemp: 4,
  maxWindSpeed: 20
};

const isValidMinThreshold = function(
  value: number,
  threshold: number | null
): boolean {
  if (threshold === null) return true;
  return Math.round(value) >= threshold;
}

const isValidMaxThreshold = function(
  value: number,
  threshold: number | null
): boolean {
  if (threshold === null) return true;
  return Math.round(value) <= threshold;
}

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

  if (!isValidMinThreshold(forecast.temp, conditions.minTemp)) return false;
  if (!isValidMaxThreshold(forecast.temp, conditions.maxTemp)) return false;
  if (!isValidMaxThreshold(forecast.windSpeed, conditions.maxWindSpeed))
    return false;
  if (!isValidWeatherFn(forecast.summary))
    return false;
  return true;
};

export {
  conditions,
  canIRideFn,
  isValidMinThreshold,
  isValidMaxThreshold,
  isValidWeatherFn
};
