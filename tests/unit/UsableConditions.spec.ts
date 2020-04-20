import  {
  isValidMinThreshold,
  isValidMaxThreshold,
  isValidWeatherFn } from "../../src/model/UsableConditions";

// isValidMinThreshold tests
it('is false when below min threshold', () => {
  expect(isValidMinThreshold(0, 5)).toBeFalsy();
});

it('is true when value is equal to min threshold', () => {
  expect(isValidMinThreshold(10, 10)).toBeTruthy();
});

it('is true when above min threshold', () => {
  expect(isValidMinThreshold(10, 5)).toBeTruthy();
});

it('is true when above threshold is null i.e. not supplied', () => {
  expect(isValidMinThreshold(10, null)).toBeTruthy();
});

// isValidMaxThreshold test
it('is false when above max threshold', () => {
  expect(isValidMaxThreshold(35, 30)).toBeFalsy();
});

it('is true when value is equal to max threshold', () => {
  expect(isValidMaxThreshold(30, 30)).toBeTruthy();
});

it('is true when below max threshold', () => {
  expect(isValidMaxThreshold(15, 30)).toBeTruthy();
});

it('is true when threshold is null i.e. not supplied', () => {
  expect(isValidMaxThreshold(10, null)).toBeTruthy();
});

// isValidWeatherFn tests
test.each`
  weather
  ${'Clouds'}   
  ${'Clear'}    
  ${'Sunshine'}
`('Weather: $weather is valid.', ({weather}) => {
  expect(isValidWeatherFn(weather)).toBeTruthy();
});

test.each`
  weather
  ${'Rain'}   
  ${'Snow'}    
  ${'Thunderstorm'}
  ${'Fog'}
  ${'Mist'}
`('Weather: $weather is invalid.', ({weather}) => {
  expect(isValidWeatherFn(weather)).toBeFalsy();
});