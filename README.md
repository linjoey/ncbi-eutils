# ncbi-eutils
> NCBI E-utilities API for JavaScript

This package is a convenience wrapper for **NCBI's E-utilities API** documented at http://www.ncbi.nlm.nih.gov/books/NBK25500/. It uses  es6 promises to support the "pipe" like feature among eutils, e.g. connecting `esearch, elink, or esummary` together. 

### Usage
Access a single eutil:
```javascript
  var eutils = require('ncbi-eutils');
  eutils.esearch({db:'gene', term: 'ltf[sym] AND human[orgn]'})
    .then(function(d){console.log(d)})
```

Basic pipelines: `esearch` -> `esummay`
```javascript
  eutils.esearch({db:'gene', term: 'ltf[sym] AND human[orgn]'})
    .then(eutils.esummary)
    .then(function(d){console.log(d)})
```

Linking pipelines: `elink` -> `efetch` 
```javascript
  eutils.elink({dbfrom: 'protein', db:'gene', id : ['15718680','157427902']})
    .then(eutils.fetch)
    .then(function(d) {console.log(d)});
```


### Install
```javascript
npm install --save ncbi-eutils
```
or
```html
<script src="ncbi-eutils.min.js"></script>
```

### API
** under development. 

### Dev Agenda
- [ ] Fix up efetch to support more user options
- [ ] test complex pipelines e.g. esearch | elink | efetch
- [ ] implement other eutils: espell, egquery, ecitmatch?
- [x] implement convenience calls for esearch -> esummary
- [ ] write test test test

### License
MIT

### NCBI Copyright & Disclaimers
Please visit http://www.ncbi.nlm.nih.gov/About/disclaimer.html for NCBI's copyright notice.
