export interface ISPRestAPI {
    GetList(): Promise<any>;
    GetListFields(): Promise<any>;
    GetListContentTypeFields(contentTypeId: string): Promise<any>;
}