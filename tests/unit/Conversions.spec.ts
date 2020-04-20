import { 
  convertMetersPerSecondToMph, 
  convertToLocalTime } from "../../src/model/Conversions";

  // convertMetersPerSecondToMph tests
  it('returns a correctly converted mps to mph', () => {
    expect(convertMetersPerSecondToMph(6.7056)).toBeCloseTo(15);
  });

  it('returns a 0 when mps is 0 converted mps to mph', () => {
    expect(convertMetersPerSecondToMph(0)).toBeCloseTo(0);
  });

  // convertToLocalTime tests
  it('converts unix timestamp', () => {
    const date = convertToLocalTime(1587381388); // 20/03/2020 12:16
    expect(date.getUTCHours()).toBe(12);
    expect(date.getMinutes()).toBe(16);
    expect(date.getDate()).toBe(20);
    expect(date.getMonth()).toBe(3);
    expect(date.getFullYear()).toBe(2020);
  })



