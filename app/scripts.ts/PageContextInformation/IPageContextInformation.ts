export interface IPageContextExtractor {
    GetPageContextInformation(): IPageContextInformation;
}

export interface IPageContextInformation {
    WebServerRelativeUrl: string;
    ListId: string;
}