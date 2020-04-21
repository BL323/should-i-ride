const locations = require('./locations');

const searchFn = function(queryString) {
  if(queryString == null || queryString.length < 3) {
    return [];
  }
  
  const matchingLocations = locations.locs.filter(
    x => x.name.toLowerCase().startsWith(queryString.toLowerCase()))
    .reverse(); // locations file is in reverse alphabetical order, but ascending IDs

  return matchingLocations;
};

module.exports = { searchFn: searchFn };