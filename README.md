Opera Update Checker
--------------------

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
- format: 'json' (default), 'xml'

### Examples
This app runs in my spreadsheet.

- [channel=stable&format=json](https://script.google.com/macros/s/AKfycbydMspXLOzC1Sm3ugkargF-S9pRzSsnAT_J_ywmNz9eGP-EpiP9/exec?channel=stable&format=json)
- [channel=developer&format=xml](https://script.google.com/macros/s/AKfycbydMspXLOzC1Sm3ugkargF-S9pRzSsnAT_J_ywmNz9eGP-EpiP9/exec?channel=developer&format=xml)

### License
MIT License<br />
Copyright (C) 2014 Pine Mizune