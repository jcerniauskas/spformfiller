import { IListInfoService, List, ContentTypeOrder } from "./IListInfoService";
import { ISPRestAPI } from "../../SPRestAPI/ISPRestAPI";
import { injectable, inject } from "inversify";
import FieldInfoConverter from "./FieldInfoConverter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";

@injectable()
export default class ListInfoRESTService implements IListInfoService {
    public constructor (@inject("ISPRestAPI") private _spRestAPI: ISPRestAPI) { }

    public async GetList(): Promise<List> {
        const listQueryResult = await this._spRestAPI.GetList();
        return <List> {
            ContentTypesEnabled: listQueryResult.d.ContentTypesEnabled
        };
    }

    public async GetListFields(): Promise<IFieldInfo[]> {
        const fieldsQueryResult = await this._spRestAPI.GetListFields();
        return fieldsQueryResult.d.results.map(fieldInfoResult => FieldInfoConverter.ConvertToIFieldInfo(fieldInfoResult));
    }

    public async GetListContentTypeFields(contentTypeId: string): Promise<IFieldInfo[]> {
        const fieldsQueryResult = await this._spRestAPI.GetListContentTypeFields(contentTypeId);
        return fieldsQueryResult.d.results.map(fieldInfoResult => FieldInfoConverter.ConvertToIFieldInfo(fieldInfoResult));
    }

    public async GetFolderContentTypeOrder(folderServerRelativeUrl: string): Promise<ContentTypeOrder> {
        const folderQueryResult = await this._spRestAPI.GetFolderUniqueContentTypeOrder(folderServerRelativeUrl);
        return ListInfoRESTService.ConvertRESTCTOrderResult(folderQueryResult.d.UniqueContentTypeOrder);
    }

    public async GetFolderUniqueContentTypeOrder(folderServerRelativeUrl: string): Promise<ContentTypeOrder> {
        const folderQueryResult = await this._spRestAPI.GetFolderUniqueContentTypeOrder(folderServerRelativeUrl);
        return ListInfoRESTService.ConvertRESTCTOrderResult(folderQueryResult.d.ContentTypeOrder);
    }

    private static ConvertRESTCTOrderResult(results: any): ContentTypeOrder {
        if (results && results.length) {
            return <ContentTypeOrder> {
                ContentTypeIds: results.map(folderResult => folderResult.StringValue),
            };
        }
    }
}