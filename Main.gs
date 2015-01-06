var SPRED_SHEET_ID = '19Gc6rE4Oo1CcrahJb5c45t1Gel-EGSvkBcNWtf3f_Bg';

var DOWNLOAD_URL_BASE = 'http://www.opera.com/download/get/';
var DOWNLOAD_URL = {
  stable: 'http://www.opera.com/download/get/?partner=www&opsys=Windows&product=Opera',
  beta: 'http://www.opera.com/download/get/?partner=www&opsys=Windows&product=Opera%20beta',
  developer: 'http://www.opera.com/download/get/?partner=www&opsys=Windows&product=Opera%20Developer'
};

var DOWNLOAD_LINK_REGEX = /=\"(\/download[^\"]+)\"/;
var VERSION_REGEX = /\/([0-9.]+)\/win/;

/**
 * GET /?channel='stable'|'beta'|'developer'&format='json'|'xml'
 */
function doGet(e) {
  return entryPoint(e, 'get');
}

function entryPoint(e, method) {
  var channel = e.parameter.channel || 'stable';
  var format = e.parameter.format || 'json';
  var info = getOperaInfo(channel);
  info.channel = channel;
  
  // エラーログを記載
  if (info.errMsg) {
    insertRow([new Date(), info.errMsg]);
  }
  
  return render(info, format);
}

function getOperaInfo(channel) {
  var downloadInfo = getOperaDownloadInfo(channel);
  if (!downloadInfo.url) {
    return downloadInfo;
  }
  
  return getOperaVersionInfo(downloadInfo.url);
}

function getOperaDownloadInfo(channel) {
  var url = DOWNLOAD_URL[channel];
  
  if (!url) {
    return { errMsg: 'Can\'t find download URL' };
  }
  
  var response = UrlFetchApp.fetch(url);
  var code = response.getResponseCode();
  var content = response.getContentText();

  // HTTP ステータスコードが 200 である場合、成功
  if (code !== 200) {
    return { errMsg: 'Can\'t fetch Opera website' }; // 失敗
  }
  
  // ダウンロード先 URL を探す
  var matches = content.match(DOWNLOAD_LINK_REGEX);
  
  if (!matches) {
    return { errMsg: 'Can\'t find a download link' }; // 失敗
  }
  
  var url = matches[1];
  url = url.replace(/&amp;/g, '&');
  
  return { url: DOWNLOAD_URL_BASE + url  };
}

function getOperaVersionInfo(url) {
  var params = {
    followRedirects: false
  };
  
  if (!url) {
    return { errMsg: 'Can\'t find download URL' };
  }

  var response = UrlFetchApp.fetch(url, params);

  var headers = response.getHeaders();
  var code = response.getResponseCode();
  var location = headers.Location;
  
  // HTTP ステータスコードが 3xx である場合、成功
  if (String(code).charAt(0) !== '3') {
    return { errMsg: 'Can\'t fetch a download page' }; // 失敗
  }
  
  // 転送先 (ダウンロード URL) が見つからない場合
  if (!location) {
    return { errMsg: 'Can\'t find *.exe url' }; // 失敗
  }



  // バージョンを取得
  var matches = location.match(VERSION_REGEX);
  
  if (!matches || !matches[1]) {
    return { errMsg: 'Can\'t find Opera version' };
  }
  
  var version = matches[1];
  
  return {
    version: version,
    downloadUrl: location
  };
}

function insertRow(rowContents) {
  try {
    var ss = SpreadsheetApp.openById(SPRED_SHEET_ID);
    var sheet = ss.getActiveSheet();
    
    sheet.appendRow(rowContents);
    
    return null;
  }
  catch (e) {
    return e;
  }
}

function render(data, format) {
  
  if (!('errMsg' in data)) {
    data.errMsg = null;
  }
  
  data.isSucceeded = !data.errMsg;
  
  if (format === 'xml') {
    return createXmlOutput(data);
  }
  
  return createJsonOutput(data);
}

function createJsonOutput(data) {
  var mime = ContentService.MimeType.JSON;
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(mime);
  
  return output;
}

function createXmlOutput(data) { 
  var mime = ContentService.MimeType.XML;
  var output = ContentService.createTextOutput(xmlStringify(data));
  output.setMimeType(mime);
  
  return output;
}
