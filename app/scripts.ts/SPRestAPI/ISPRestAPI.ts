export interface ISPRestAPI {
    GetListFields(): Promise<any>;
    GetList(): Promise<any>;
}