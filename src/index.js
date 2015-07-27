
var http = require('http');
var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term=1[chr]+AND+1[CHRPOS]:5000000[CHRPOS]+AND+human[ORGN]&retmode=json'

function requestJSON(url) {
  return new Promise(function(resolve, reject) {
    var body = '';
    http.get(url, function(res) {
      if (res.statusCode === 200) {
        res.on('data', function(chunk) {
          body += chunk;
        });
        res.on('end', function() {
          resolve(JSON.parse(body));
          console.log(body)
        })
      } else {
        reject(res.statusMessage);
      }
      res.on('error', function(e) {
        reject(e.message);
      });
    })
  });
}

requestJSON(url).then(function(d){
  console.log(d);
}).catch(function(d){
  console.log('error', d);
})