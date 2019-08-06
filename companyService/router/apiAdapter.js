const axios = require('axios');

module.exports = baseURL =>
  axios.default.create({
    baseURL,
  });
