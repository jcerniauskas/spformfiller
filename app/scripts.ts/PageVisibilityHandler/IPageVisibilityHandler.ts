export interface IChromeChangeEventInfo {
    tabId: number;
    changeInfo: chrome.tabs.TabChangeInfo;
    tab: chrome.tabs.Tab;
}

export interface IPageVisibilityHandler {
    ShouldShowPage(changeEventInfo: IChromeChangeEventInfo): boolean;
}