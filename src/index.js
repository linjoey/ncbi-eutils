
var Term = require('./term.js');
var request = require('./request.js');

var EUTILS_BASE = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

var eutils = {
  version: '0.0.1',
  einfo: einfo
};


function einfo(db) {
  var requestURL = EUTILS_BASE + 'einfo.fcgi?retmode=json&version=2.0&';
  if (db !== undefined) {
    requestURL += 'db=' + db;
  }
  return request(requestURL);
}

module.exports = eutils;