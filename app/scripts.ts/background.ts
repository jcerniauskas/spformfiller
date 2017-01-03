import { IPageVisibilityHandler } from "./PageVisibilityHandler/IPageVisibilityHandler";
import kernel from "./inversify.config";

let pageVisibilityHandler = kernel.get<IPageVisibilityHandler>("IPageVisibilityHandler");

chrome.runtime.onInstalled.addListener(details => {
  console.log("previousVersion", details.previousVersion);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (pageVisibilityHandler.ShouldShowPage({tabId, changeInfo, tab})) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, { file: "scripts/vendor/jquery.min.js" }, function() {
    chrome.tabs.executeScript(tab.id, { file: "scripts/contentscript.js" });
  });
});