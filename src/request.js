var http = require('http');
var Promise = require('es6-promise').Promise;


var EUTILS_BASE = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
var url = 'esearch.fcgi?db=gene&term=1[chr]+AND+1[CHRPOS]:5000000[CHRPOS]+AND+human[ORGN]&retmode=json';

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

