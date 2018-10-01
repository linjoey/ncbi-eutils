var axios = require('axios');

function request(url) {
    return axios.get(url);
}

module.exports = request;

