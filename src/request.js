
var http = require('https');
var Promise = require('es6-promise').Promise;

function request(url) {
  return new Promise(function(resolve, reject) {
    var body = '';
    http.get(url, function(res) {
      if (res.statusCode === 200) {
        res.on('data', function(chunk) {
          body += chunk;
        });
        res.on('end', function() {
          resolve(body);
        })
      } else {
        reject(res.statusMessage);
      }
    })
  });
}

module.exports = request;

