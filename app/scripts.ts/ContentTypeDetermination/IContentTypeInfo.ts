export interface IContentTypeInformation {
    ContentTypeId: string;
}

export interface IContentTypeDeterminer {
    GetContentTypeInformation(): Promise<IContentTypeInformation>;
}