export interface IPageContextExtractor {
    GetPageContextInformation(): IPageContextInformation;
}

export interface IPageContextInformation {
    WebServerRelativeUrl: string;
    ListId: string;
    FolderUrl: string;
    ContentTypeId: string;
    ListServerRelativeUrl: string;
}