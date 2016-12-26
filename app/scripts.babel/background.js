'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

chrome.pageAction.onClicked.addListener(function(tab) {
  alert('this is working');
  chrome.tabs.executeScript(tab.id, { file: 'scripts/vendor/jquery.min.js' }, function() {
    chrome.tabs.executeScript(tab.id, { file: 'scripts/contentscript.js' });
  });
});

console.log('\'Allo \'Allo! Event Page for Page Action');
