import { IListInfoService, List, ContentTypeOrder } from "./IListInfoService";
import { ISPRestAPI } from "../../SPRestAPI/ISPRestAPI";
import { injectable, inject } from "inversify";
import { FieldInfoConverter } from "./FieldInfoConverter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";

// this is an implementation of IListInfoService which uses SharePoint's REST API to get information about fields and content types
@injectable()
export class ListInfoRESTService implements IListInfoService {
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
        const folderQueryResult = await this._spRestAPI.GetFolderContentTypeOrder(folderServerRelativeUrl);
        if (folderQueryResult && folderQueryResult.d.ContentTypeOrder && folderQueryResult.d.ContentTypeOrder.results) {
            return ListInfoRESTService.ConvertRESTCTOrderResult(folderQueryResult.d.ContentTypeOrder.results);
        }
    }

    public async GetFolderUniqueContentTypeOrder(folderServerRelativeUrl: string): Promise<ContentTypeOrder> {
        const folderQueryResult = await this._spRestAPI.GetFolderUniqueContentTypeOrder(folderServerRelativeUrl);
        if (folderQueryResult && folderQueryResult.d.UniqueContentTypeOrder && folderQueryResult.d.UniqueContentTypeOrder.results) {
            return ListInfoRESTService.ConvertRESTCTOrderResult(folderQueryResult.d.UniqueContentTypeOrder.results);
        }
    }

    private static ConvertRESTCTOrderResult(results: any): ContentTypeOrder {
        if (results && results.length) {
            return <ContentTypeOrder> {
                ContentTypeIds: results.map(folderResult => folderResult.StringValue),
            };
        }
    }
}