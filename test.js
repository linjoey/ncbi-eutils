
var eutils = require('../ncbi-eutils');

var start = new Date().getTime();
eutils.esearch({db:'gene', term:'X[chr] AND 8810001[CPOS]:18279999[CPOS] AND human[ORGN]'})
  //.then(eutils.esummary)
  .then(function(d) {
    var end = new Date().getTime();
    var time = end - start;
    console.log('time', time)
    //console.log(d)
    }
).catch(function(e) {console.log(e)});