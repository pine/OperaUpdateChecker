Opera Update Checker
--------------------
[![Build Status](https://travis-ci.org/pine/OperaUpdateChecker.svg?branch=master)](https://travis-ci.org/pine/OperaUpdateChecker)
[![devDependency Status](https://david-dm.org/pine/OperaUpdateChecker/dev-status.svg)](https://david-dm.org/pine/OperaUpdateChecker#info=devDependencies)

This is a Google Apps Script that get latest version of Opera.

## Developing enviroment

- JavaScript
- Google Apps Script (Spreadsheet)

## API
### Endpoint

```
GET /?channel=[opera update channel]&format=[output format]
```

### Parameters
Both parameters are optional.

- channel: 'stable' (default), 'beta', or 'developer'
- format: 'json' (default) or 'xml'

### Examples
This app runs in my spreadsheet.

- [channel=stable&format=json](https://script.google.com/macros/s/AKfycbydMspXLOzC1Sm3ugkargF-S9pRzSsnAT_J_ywmNz9eGP-EpiP9/exec?channel=stable&format=json)
```json
{
  "version":"26.0.1656.32",
  "downloadUrl":"http://operasoftware.pc.cdn.bitgravity.com/pub/opera/desktop/26.0.1656.32/win/Opera_26.0.1656.32_Setup.exe",
  "channel":"stable",
  "errMsg":null,
  "isSucceeded":true
}
```
- [channel=developer&format=xml](https://script.google.com/macros/s/AKfycbydMspXLOzC1Sm3ugkargF-S9pRzSsnAT_J_ywmNz9eGP-EpiP9/exec?channel=developer&format=xml)
```xml
<?xml version="1.0" encoding="utf-8"?>
<object>
  <version>27.0.1689.22</version>
  <downloadUrl>http://get.geo.opera.com.global.prod.fastly.net/pub/opera/../opera-developer/27.0.1689.22/win/Opera_Developer_27.0.1689.22_Setup.exe</downloadUrl>
  <channel>developer</channel>
  <errMsg>
    <null/>
  </errMsg>
  <isSucceeded>
    <true/>
  </isSucceeded>
</object>
```

### Tests
There are some tests written by [Vows](http://vowsjs.org/) and [Chai](http://vowsjs.org/). The tests use some mock that run on Node.js as Google Apps Script API.

```
$ npm install
$ npm test
```

### License
MIT License
