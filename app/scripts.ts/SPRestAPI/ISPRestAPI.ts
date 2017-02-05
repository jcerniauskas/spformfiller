export interface ISPRestAPI {
    GetList(): Promise<any>;
    GetListFields(): Promise<any>;
    GetListContentTypeFields(contentTypeId: string): Promise<any>;
    GetSiteUsers(): Promise<any>;
    GetGroupUsers(groupId: number): Promise<any>;
}