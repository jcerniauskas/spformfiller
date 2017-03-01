import { IFieldInfo } from "../../FieldInfo/IFieldInfo";

export interface List {
    ContentTypesEnabled: boolean;
}

export interface ContentTypeOrder {
    ContentTypeIds: string[];
}

export interface IListInfoService {
    GetList(): Promise<List>;
    GetListFields(): Promise<IFieldInfo[]>;
    GetListContentTypeFields(contentTypeId: string): Promise<IFieldInfo[]>;
    GetFolderContentTypeOrder(folderServerRelativeUrl?: string): Promise<ContentTypeOrder>;
    GetFolderUniqueContentTypeOrder(folderServerRelativeUrl?: string): Promise<ContentTypeOrder>;
}