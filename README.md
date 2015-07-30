# ncbi-eutils

This package is a JavaScript wrapper for **NCBI's E-utilities API** documented at http://www.ncbi.nlm.nih.gov/books/NBK25500/. It uses  ES6 promises to support "piping" to combine successive E-utility calls, e.g. piping `esearch` results to `elink`, then piping its result to `esummary`. This can be used in node (CommonJS) or the browser.

[![npm version](https://badge.fury.io/js/ncbi-eutils.svg)](http://badge.fury.io/js/ncbi-eutils)
[![npm version](https://img.shields.io/badge/license-MIT-blue.svg)]()

### Usage
Access a single eutil:
```javascript
  var eutils = require('ncbi-eutils');
  eutils.esearch({db:'gene', term: 'foxp2[sym] AND human[orgn]'})
    .then(function(d){console.log(d)}) 
```

Basic data pipelines: `esearch` -> `esummay`
```javascript
  eutils.esearch({db:'gene', term: 'ltf[sym] AND human[orgn]'})
    .then(eutils.esummary)
    .then(function(d){console.log(d)})
```

More complex data pipelines: `esearch` -> `elink` -> `esummary` 
```javascript
  eutils.esearch({db: 'protein', term: '15718680[UID]'})
    .then(eutils.elink({dbto:'gene'}))
    .then(function(d) {
      //supported eutil parameters can be added like this
      d.retstart = 5;
      return eutils.esummary(d);
    })
    .then(function (d) {console.log(d)})
    .catch(function (d) {console.log(d)});
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

## API

All calls in this package return a promise object. To get the return values, pass a function to .then() or .catch() to get the results and errors, respectively. Alternatively, pass another eutil function to .then() to create a data pipeline. For detailed descriptions of each E-utility, please visit NCBI's documentations.

### eutils.einfo([db])
If **db** is specified, return all metadata for that database. Otherwise, return the list of all available NCBI databases. To see a live example of this, go to: http://linjoey.github.io/ncbi-eutils/docs/dbinfo.html.

### eutils.esearch(options)
> Provides a list of UIDs matching a text query

**options.db** a valid NCBI database name

**options.term** a valid search term

### eutils.esummary(options)
> Returns document summaries (DocSums) for a list of input UIDs

**options.db** a valid NCBI database name

**options.id** array of ids to pass to esummary e.g ['12345', '67890']. Only required if called as the start of a pipeline.

### eutils.efetch(options)
> Returns formatted data records for a list of input UIDs

**options.db** a valid NCBI database name

**options.id** array of ids to pass to efetch e.g ['12345', '67890']. Only required if called as the start of a pipeline.

### eutils.elink(options)
> Returns UIDs linked to an input set of UIDs in either the same or a different Entrez database

**options.dbto** a valid NCBI database name

**options.dbfrom** a valid NCBI database name. Only required if called as the start of a pipeline.

**options.id** array of ids to pass to esummary e.g ['12345', '67890']. Only required if called as the start of a pipeline.



### Dev Agenda
- [ ] Fix up efetch to support more user options
- [x] test complex pipelines e.g. esearch | elink | efetch
- [ ] implement other eutils: espell, egquery, ecitmatch?
- [x] implement convenience calls for esearch -> esummary
- [ ] write test test test
- [ ] elink-> results dont have auto history server, relinking to other eutils use manual id passing. Implement epost to support large tasks

### NCBI Copyright & Disclaimers
Please visit http://www.ncbi.nlm.nih.gov/About/disclaimer.html for NCBI's copyright notice.

## License
MIT
