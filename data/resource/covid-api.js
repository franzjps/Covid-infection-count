
const axios = require('axios');


async function status(contentType = 'json', baseUrl = 'https://coronavirus-19-api.herokuapp.com/countries') {
  try {
      let accept = 'application/json'

      let response = await axios.get(`${baseUrl}`, {
          headers: {
              'Accept': accept
          }
      });

      let responses = response.data;

    //   console.log(responses)

      return responses
  } catch (err) {
      console.log(err)
  }
}
  let statuses = status()

  console.log(statuses);

  module.exports = {statuses: statuses}