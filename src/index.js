
var Term = require('./term.js');
var request = require('./request.js');
var xml2js = require('xml2js').parseString;
var version = require('../package.json').version;

var EUTILS_BASE = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

function buildQueryParameters(options, ignoreList) {
  var query = '';
  for (var prop in options) {
    if (options.hasOwnProperty(prop) && ignoreList.indexOf(prop) == -1) {
      query += '&' + prop + '=' + options[prop];
    }
  }
  return query;
}

function einfo(db) {
  var requestURL = EUTILS_BASE + 'einfo.fcgi?retmode=json&';
  if (db !== undefined) {
    requestURL += 'version=2.0&db=' + db;
  }
  return request(requestURL).then(function(res) {
    return JSON.parse(res);
  });
}

function ensureOptionIsSet(options, names, tag) {
  var msg = 'Invalid arguments supplied to ' + tag;
  if (options === undefined) {
    throw new Error(msg);
  }

  for (var i = 0; i < names.length; ++i) {
    if (options[names[i]] === undefined) {
      throw new Error(msg);
    }
  }
}

var esearch = function (options) {

  ensureOptionIsSet(options, ['db', 'term'], 'esearch');

  var requestURL = EUTILS_BASE + 'esearch.fcgi?retmode=json&usehistory=y';
  requestURL += buildQueryParameters(options, ['term', 'usehistory', 'retmode']);
  requestURL += '&term=' + (options.term instanceof Term ? options.term.queryText : options.term);

  return request(requestURL).then(function(res) {
    var jsonRes = JSON.parse(res);
    jsonRes.db = options.db;
    return jsonRes;
  });
};

var esummary = function(options) {

  ensureOptionIsSet(options, ['db'], 'esummary');

  var requestURL = EUTILS_BASE + 'esummary.fcgi?retmode=json';
  requestURL += buildQueryParameters(options, ['retmode', 'esearchresult', 'header']);

  if (options.esearchresult !== undefined) {
    requestURL += '&query_key=' + options.esearchresult.querykey;
    requestURL += '&webenv=' + options.esearchresult.webenv;
  }

  return request(requestURL).then(function(res) {
    var jsonRes = JSON.parse(res);
    jsonRes.db = options.db;
    return jsonRes;
  });
};

//TODO enhance to support rettype and retmode
//http://www.ncbi.nlm.nih.gov/books/NBK25499/table/chapter4.T._valid_values_of__retmode_and/?report=objectonly
var efetch = function(options) {

  ensureOptionIsSet(options, ['db'], 'efetch');

  var requestURL = EUTILS_BASE + 'efetch.fcgi?retmode=xml';
  requestURL += buildQueryParameters(options, ['retmode', 'esearchresult', 'header']);

  if (options.esearchresult !== undefined) {
    requestURL += '&query_key=' + options.esearchresult.querykey;
    requestURL += '&webenv=' + options.esearchresult.webenv;
  }

  return request(requestURL).then(function(res) {
    return new Promise(function(resolve, reject) {
      xml2js(res, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  });
};

var elink = function(options) {
  ensureOptionIsSet(options, ['dbfrom','db'], 'esummary');

  var requestURL = EUTILS_BASE + 'elink.fcgi?retmode=json';
  requestURL += buildQueryParameters(options, ['retmode', 'esearchresult', 'header']);

  if (options.esearchresult !== undefined) {
    requestURL += '&query_key=' + options.esearchresult.querykey;
    requestURL += '&webenv=' + options.esearchresult.webenv;
  }

  return request(requestURL).then(function(res) {
    var jsonRes = JSON.parse(res);
    jsonRes.db = options.db;
    jsonRes.id = jsonRes.linksets[0].linksetdbs[0].links;
    return jsonRes;
  });
};


module.exports = {
  version: version,
  einfo: einfo,
  esearch: esearch,
  esummary: esummary,
  efetch: efetch,
  elink: elink
};