import fetch from "node-fetch";

const getMessage = async function() {
    const response = await fetch('.netlify/functions/yo', {
        headers: { Accept: 'application/json' }
      })
      if (!response.ok) {
        // NOT res.status >= 200 && res.status < 300
        return { statusCode: response.status, body: response.statusText }
      }
      const data = await response.json()
  
      return data;
}

const getJoke = async function() {
    const response = await fetch('.netlify/functions/fetch', {
        headers: { Accept: 'application/json' }
      })
      if (!response.ok) {
        // NOT res.status >= 200 && res.status < 300
        return { statusCode: response.status, body: response.statusText }
      }
      const data = await response.json()
  
      return data;
}

export { getMessage, getJoke };