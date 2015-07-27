
var Term = require('./term.js');
var request = require('./request.js');
var assign = require('lodash.assign');

var EUTILS_BASE = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

function einfo(db) {
  var requestURL = EUTILS_BASE + 'einfo.fcgi?retmode=json&';
  if (db !== undefined) {
    requestURL += 'version=2.0&db=' + db;
  }
  return request(requestURL).then(function(res) {
    return JSON.parse(res);
  });
}

function buildQueryParameters(options, ignoreList) {
  var query = '';
  for (var prop in options) {
    if (options.hasOwnProperty(prop) && ignoreList.indexOf(prop) == -1) {
      query += '&' + prop + '=' + options[prop];
    }
  }
  return query;
}

var esearch = function (options) {

  if (options === undefined || options.db === undefined || options.term === undefined) {
    throw new Error('esearch required arguments not specified');
  }

  var requestURL = EUTILS_BASE + 'esearch.fcgi?retmode=json&usehistory=y';

  requestURL += buildQueryParameters(options, ['term', 'usehistory', 'retmode']);
  requestURL += '&term=' + (options.term instanceof Term ? options.term.queryText : options.term);
  console.log('esearch', requestURL)

  return request(requestURL).then(function(res) {
    var jsonRes = JSON.parse(res);
    jsonRes.db = options.db;
    return jsonRes;
  });
};

var esummary = function(options) {
  console.log('esummar', options)

  if (options === undefined || options.db === undefined) {
    throw new Error('esearch required arguments not specified');
  }

  var requestURL = EUTILS_BASE + 'esummary.fcgi?retmode=json';
  requestURL += buildQueryParameters(options, ['retmode', 'esearchresult', 'header']);

  if (options.esearchresult !== undefined) {
    requestURL += '&query_key=' + options.esearchresult.querykey;
    requestURL += '&webenv=' + options.esearchresult.webenv;
  }

  console.log(requestURL)
  return request(requestURL).then(function(res) {
    var jsonRes = JSON.parse(res);
    jsonRes.db = options.db;
    return jsonRes;
  });
};


module.exports = {
  version: '0.0.1',
  einfo: einfo,
  esearch: esearch,
  esummary: esummary
};