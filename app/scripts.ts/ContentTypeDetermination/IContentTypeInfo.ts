export interface IContentTypeInformation {
    ContentTypeId: string;
    ContentTypeTitle: string;
}

export interface IContentTypeDeterminer {
    GetContentTypeInformation(): Promise<IContentTypeInformation>;
}