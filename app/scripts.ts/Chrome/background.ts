import { IPageVisibilityHandler } from "../PageVisibilityHandler/IPageVisibilityHandler";
import Container from "../versionedInversify.config";
import { FillFormMessage, FillFormMessageResponse } from "./Helpers/MessageInterface";

Container.Initialize();
const pageVisibilityHandler = Container.Current.get<IPageVisibilityHandler>("IPageVisibilityHandler");

chrome.runtime.onInstalled.addListener(details => {
  console.log("previousVersion", details.previousVersion);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (pageVisibilityHandler.ShouldShowPage({tabId, changeInfo, tab})) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, <FillFormMessage>{ FillForm: true }, (response) => {
    // check if we get response - if we don't get a response, then it means that content script probably hasn't loaded yet and we need to load it
    if (!response) {
      chrome.tabs.executeScript(tab.id, { file: "scripts/contentscript.js" }, () => {
        // now send the actual message again to the loaded script
        chrome.tabs.sendMessage(tab.id, <FillFormMessage>{ FillForm: true });
      });
    }
  });
});