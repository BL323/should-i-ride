const search = require('../../functions/search-location/search');

it('returns empty list with less than 3 characters', () => {
  expect(search.searchFn('')).toStrictEqual([]);
})

it('returns one item when searching for Tring', () => {
  const expected = {
    id: 2635459,
    name: "Tring",
    state: "",
    country: "GB",
    coord: {
      lon: -0.65824,
      lat: 51.794708
    }
  };

  const results = search.searchFn('Tring');
  expect(results.length).toBe(1);
  expect(results[0]).toEqual(
    expect.objectContaining({...expected})
  );
})

it('returns consistent results for lower case variant tring', () => {
  const expected = {
    id: 2635459,
    name: "Tring",
    state: "",
    country: "GB",
    coord: {
      lon: -0.65824,
      lat: 51.794708
    }
  };

  const results = search.searchFn('tring');
  expect(results.length).toBe(1);
  expect(results[0]).toEqual(
    expect.objectContaining({...expected})
  );
})

it('returns consistent results for upper case variant TRING', () => {
  const expected = {
    id: 2635459,
    name: "Tring",
    state: "",
    country: "GB",
    coord: {
      lon: -0.65824,
      lat: 51.794708
    }
  };

  const results = search.searchFn('TRING');
  expect(results.length).toBe(1);
  expect(results[0]).toEqual(
    expect.objectContaining({...expected})
  );
})