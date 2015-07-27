/**
 * Class Term
 */
var Term = (function() {
  function _attachField (op, value, field) {
    if (op !== undefined) {
      this.queryText += ' ' + op + ' ';
    }

    this.queryText += value;

    if (field !== undefined) {
      this.queryText += '[' + field + ']';
    }
  }

  function _termConstructor(value, field) {
    var _this = this;
    _this.queryText = '';
    _this.termAdded = false;

    if (value !== undefined) {
      _attachField.call(_this, undefined, value, field);
    }

    Object.defineProperty(_termConstructor.prototype, 'openParen', {
      get: function() {
        _this.queryText += '(';
        return _this;
      }
    });

    Object.defineProperty(_termConstructor.prototype, 'closeParen', {
      get: function() {
        _this.queryText += ')';
        return _this;
      }
    });
  }

  _termConstructor.prototype.and = function(value, field) {
    _attachField.call(this, 'AND', value, field);
    return this;
  };

  _termConstructor.prototype.or = function(value, field) {
    _attachField.call(this, 'OR', value, field);
    return this;
  };

  _termConstructor.prototype.not = function(value, field) {
    _attachField.call(this, 'NOT', value, field);
    return this;
  };

  _termConstructor.prototype.range = function(op, range, field) {
    this.queryText += ' ' + op.toUpperCase() + ' ' + range[0] + '[' + field + ']:' + range[1] + '[' + field + '] ';
    return this;
  };

  return _termConstructor;
})();

module.exports = Term;