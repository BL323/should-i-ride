const search = require('./search');

exports.handler = async (event, context) => {
  try {
    const queryString = event.queryStringParameters.location;
    const matchingLocations = search.searchFn(queryString);

    return {
      statusCode: 200,
      body: JSON.stringify({ locations: matchingLocations})
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
