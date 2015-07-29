# ncbi-eutils

This package is a JavaScript wrapper for **NCBI's E-utilities API** documented at http://www.ncbi.nlm.nih.gov/books/NBK25500/. It uses  ES6 promises to support "piping" to combine successive E-utility calls, e.g. piping `esearch` results to `elink`, then piping its result to `esummary`. This can be used in node (CommonJS) or the browser.

### Usage
Access a single eutil:
```javascript
  var eutils = require('ncbi-eutils');
  eutils.esearch({db:'gene', term: 'ltf[sym] AND human[orgn]'})
    .then(function(d){console.log(d)})
```

Basic data pipelines: `esearch` -> `esummay`
```javascript
  eutils.esearch({db:'gene', term: 'ltf[sym] AND human[orgn]'})
    .then(eutils.esummary)
    .then(function(d){console.log(d)})
    .catch(function(e){ //if error})
```

More complex data pipelines: `esearch` -> `elink` -> `esummary` 
```javascript
  eutils.esearch({db: 'protein', term: '15718680[UID]'})
    .then(function (d) {
      d.dbto = 'gene';
      return eutils.elink(d);
    })
    .then(function(d) {
        //configure additional esummary options here
        d.retstart = 10;
        return eutils.esummary(d);
    })
    .then(function (d) {console.log(d)})
```


### Install
```javascript
npm install --save ncbi-eutils
```
or in a browser
```html
<script src="ncbi-eutils.min.js"></script>
<script>
      var eutils = require('ncbi-eutils');
      ...
</script>
```

### API

All calls in this package return a promise object. To get the return values, pass a function to .then() or .catch to get the results and errors, respectively. Alternatively, pass another eutil function to .then() to create pipelines.

#### eutils.einfo([db])
If **db** is specified, return all metadata for that database. Otherwise return a list of all available NCBI databases.

### Dev Agenda
- [ ] Fix up efetch to support more user options
- [ ] test complex pipelines e.g. esearch | elink | efetch
- [ ] implement other eutils: espell, egquery, ecitmatch?
- [x] implement convenience calls for esearch -> esummary
- [ ] write test test test
- [ ] elink-> results dont have auto history server, relinking to other eutils use manual id passing. Implement epost to support large tasks

### License
MIT

### NCBI Copyright & Disclaimers
Please visit http://www.ncbi.nlm.nih.gov/About/disclaimer.html for NCBI's copyright notice.
