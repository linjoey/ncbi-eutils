
var Term = require('./term.js');
var request = require('./request.js');

var EUTILS_BASE = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

var eutils = {
  version: '0.0.1',
  einfo: einfo
};


function einfo(db) {
  var requestURL = EUTILS_BASE + 'einfo.fcgi?retmode=json&';
  if (db !== undefined) {
    requestURL += '&version=2.0&db=' + db;
  }
  return request(requestURL).then(function(res) {
    var json = JSON.parse(res);
    return json.einforesult;
  });
}

function esearch(db, term, options) {

}

module.exports = eutils;