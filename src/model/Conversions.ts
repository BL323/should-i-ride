function convertToLocalTime(unixTimeStamp: number): Date {
  let date = new Date(unixTimeStamp * 1000);
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);
  return date;
}

function convertMetersPerSecondToMph(mps: number): number {
  return mps * 2.237;
}

export { convertMetersPerSecondToMph, convertToLocalTime };