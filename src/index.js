

var version = require('../package.json').version
  , Term = require('./term.js')
  , eutilsAPI = require('./core-utils')

eutilsAPI.version = version;

eutilsAPI.search = function(db, term) {
  return eutilsAPI.esearch(db, term).then(eutilsAPI.esummary);
};


module.exports = eutilsAPI;