
const axios = require('axios');


async function status(contentType = 'json', baseUrl = 'http://covid-rest.herokuapp.com/?fbclid=IwAR0ib1MNHRPcTcFy4hANx3iEMGA8pyrw-Kkb4TTsypq6Yv22kZ7NSqZF3p0') {
  try {
      let accept = 'application/json'

      let response = await axios.get(`${baseUrl}/status`, {
          headers: {
              'Accept': accept
          }
      });

      let responses = response.data;

      // console.log(responses.data[1].country_name)

      return responses.data[1].country_name;
  } catch (err) {
      throw trimError(err)
  }
}
  let statuses = status()
  console.log(statuses);

  // module.exports = {status: status}