

var version = require('../package.json').version
  , Term = require('./term.js')
  , eutilsAPI = require('./core-utils');

eutilsAPI.version = version;

eutilsAPI.buildSearchTerm = function buildSearchTerm(value, field) {
  return new Term(value, field);
};

eutilsAPI.search = function(db, term) {
  var eopts = {
    db: db,
    term: term
  };

  if (arguments.length == 1 && typeof arguments[0] === 'object') {
    eopts = arguments[0];
  }
  return eutilsAPI.esearch(eopts).then(eutilsAPI.esummary);
};


module.exports = eutilsAPI;