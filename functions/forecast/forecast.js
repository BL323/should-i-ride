/* eslint-disable */
const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  try {
    const { Weather_Api_Key } = process.env;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=51.9887&lon=-0.619&APPID=${Weather_Api_Key}`
    const response = await fetch(requestUrl, {
      headers: { Accept: 'application/json' }
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ forecast: data })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
