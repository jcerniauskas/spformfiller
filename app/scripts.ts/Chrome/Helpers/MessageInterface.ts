// interfaces for message passing between background script and content script

export interface FillFormMessage {
    FillForm: boolean;
}

export interface FillFormMessageResponse {
    ActionProcessed: boolean;
}