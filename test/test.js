
var assert = require('assert');
var eutils = require('../src/index');

describe('ncbi-eutils API object', function() {
  describe('version', function() {
    it('should be defined', function() {
      assert.ok(eutils.version);
    })
  });

  describe('search', function() {
    it('should be defined', function() {
      assert.equal('function', typeof eutils.search);
    })
  });

  describe('einfo', function() {
    it('should be defined', function() {
      assert.equal('function', typeof eutils.einfo);
    })
  });

  describe('esearch', function() {
    it('should be defined', function() {
      assert.equal('function', typeof eutils.search);
    })
  });

  describe('efetch', function() {
    it('should be defined', function() {
      assert.equal('function', typeof eutils.search);
    })
  });

  describe('esummary', function() {
    it('should be defined', function() {
      assert.equal('function', typeof eutils.esummary);
    })
  });

  describe('elink', function() {
    it('should be defined', function() {
      assert.equal('function', typeof eutils.elink);
    })
  });

  describe('buildSearchTerm', function() {
    it('should be defined', function() {
      assert.equal('function', typeof eutils.buildSearchTerm);
    })
  });

});


describe('ncbi core e-utils', function () {
    describe('#esearch()', function() {
        it('should return few article ids', function (done) {

            eutils.esearch({db: 'pubmed', retmax: 10, term: 'Vitiligo'})
                .then(d => {
                    assert(d.esearchresult.idlist.length > 1);
                    done();
                });
        });

    });
});
