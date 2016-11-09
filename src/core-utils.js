
var request = require('./request.js')
  , Term = require('./term.js')
  , xml2js = require('xml2js').parseString
  , assign = require('lodash.assign')
  , EUTILS_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

function buildQueryParameters(options, ignoreList) {
  var query = '';
  for (var prop in options) {
    if (options.hasOwnProperty(prop) && ignoreList.indexOf(prop) == -1) {
      query += '&' + prop + '=' + options[prop];
    }
  }
  return query;
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

exports.einfo = function einfo(db) {
  var requestURL = EUTILS_BASE + 'einfo.fcgi?retmode=json&';
  if (db !== undefined) {
    requestURL += 'version=2.0&db=' + db;
  }
  return request(requestURL).then(function(res) {
    return JSON.parse(res);
  });
};

exports.esearch = function esearch(userOptions) {
  ensureOptionIsSet(userOptions, ['db', 'term'], 'esearch');

  var options = assign({
    retmax: 200
  }, userOptions);

  var requestURL = EUTILS_BASE + 'esearch.fcgi?retmode=json&usehistory=y';
  requestURL += buildQueryParameters(options, ['term', 'usehistory', 'retmode']);
  requestURL += '&term=' + (options.term instanceof Term ? options.term.queryText : options.term);

  return request(requestURL).then(function(res) {
    var jsonRes = JSON.parse(res);
    jsonRes.db = options.db;

    if (jsonRes.esearchresult.count <= options.retmax) {
      jsonRes.id = jsonRes.esearchresult.idlist;
    }

    return jsonRes;
  });
};

function makeRequest(requestURL) {
  return request(requestURL).then(function(res) {
    return new Promise(function(resolve, reject) {
      xml2js(res, {explicitArray:false}, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  });
}
exports.esummary = function summary(options) {
  ensureOptionIsSet(options, ['db'], 'esummary');

  var requestURL = EUTILS_BASE + 'esummary.fcgi?';
  requestURL += buildQueryParameters(options, ['esearchresult', 'header']);

  if (options.id === undefined) {
    requestURL += '&query_key=' + options.esearchresult.querykey;
    requestURL += '&webenv=' + options.esearchresult.webenv;
  }

  return makeRequest(requestURL);
};

function getWebenvKeysForURL(options) {
  var url = '';
  if (options.esearchresult !== undefined) {
    url += '&query_key=' + options.esearchresult.querykey;
    url += '&webenv=' + options.esearchresult.webenv;
  }
  return url;
}

//TODO enhance to support rettype and retmode
//http://www.ncbi.nlm.nih.gov/books/NBK25499/table/chapter4.T._valid_values_of__retmode_and/?report=objectonly
exports.efetch = function efetch(options) {
  ensureOptionIsSet(options, ['db'], 'efetch');

  var requestURL = EUTILS_BASE + 'efetch.fcgi?retmode=xml';
  requestURL += buildQueryParameters(options, ['retmode', 'esearchresult', 'header']);
  requestURL += getWebenvKeysForURL(options);

  return makeRequest(requestURL);
};

exports.elink = function(userOptions) {

  return function elink(options) {
    options = assign(options, userOptions);

    if (options.header && (options.header.type === 'esearch' || options.header.type === 'elink')) {
      options.dbfrom = options.db;
    }

    options.db = options.dbto;

    ensureOptionIsSet(options, ['dbfrom','dbto'], 'elink');

    var requestURL = EUTILS_BASE + 'elink.fcgi?retmode=json';
    requestURL += buildQueryParameters(options, ['retmode', 'esearchresult', 'header']);
    requestURL += getWebenvKeysForURL(options);

    return request(requestURL).then(function(res) {
      var jsonRes = JSON.parse(res);
      jsonRes.db = options.db;
      jsonRes.id = jsonRes.linksets[0].linksetdbs[0].links;
      return jsonRes;
    });
  };
};