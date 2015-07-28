
var assert = require('assert');
var eutils = require('../../ncbi-eutils');

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
  describe('#einfo()', function() {
    it('should list all the databases with no parameters', function(done) {
      eutils.einfo().then(function(d) {
        assert(d.einforesult.dblist.length >= 47);
        assert(d.einforesult.dblist.indexOf('gene') > -1);
        assert(d.einforesult.dblist.indexOf('protein') > -1);
        assert(d.einforesult.dblist.indexOf('pubmed') > -1);
        done();
      });
    });

    it('should return info for a single db', function(done){
      eutils.einfo('gene').then(function(d) {
        assert.equal(d.einforesult.dbinfo.dbname, 'gene');
        assert.ok(d.einforesult.dbinfo.fieldlist[0].istruncatable);
        done();
      });
    });
  });
});

