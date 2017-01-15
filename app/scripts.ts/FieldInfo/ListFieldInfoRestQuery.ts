import { IFieldInfo, IFieldInfoGatherer } from "./IFieldInfo";
import { injectable, inject } from "inversify";
import { ISPRestAPI } from "../SPRestAPI/ISPRestAPI";
import { IContentTypeDeterminer, IContentTypeInformation } from "../ContentTypeDetermination/IContentTypeInfo";

@injectable()
export default class ListFieldInfoRestQuery implements IFieldInfoGatherer {
    private _spRestAPI: ISPRestAPI;
    private _contentTypeDeterminer: IContentTypeDeterminer;

    public constructor(@inject("ISPRestAPI") spRestAPI: ISPRestAPI, @inject("IContentTypeDeterminer") contentTypeDeterminer: IContentTypeDeterminer) {
        this._spRestAPI = spRestAPI;
        this._contentTypeDeterminer = contentTypeDeterminer;
    }

    private _cachedFieldInfo: Promise<IFieldInfo[]>;
    private async GetCachedFieldInfo(): Promise<IFieldInfo[]> {
        if (this._cachedFieldInfo === undefined) {
            this._cachedFieldInfo = this.LoadFields();
        }

        return this._cachedFieldInfo;
    }
    private async LoadFields(): Promise<IFieldInfo[]> {
        let listQueryResult = await this._spRestAPI.GetList();
        let fieldsResult: any = undefined;
        if (listQueryResult.ContentTypesEnabled) {
            let contentTypeInformation = await this._contentTypeDeterminer.GetContentTypeInformation();
            fieldsResult = await this._spRestAPI.GetListContentTypeFields(contentTypeInformation.ContentTypeId);
        } else {
            fieldsResult = await this._spRestAPI.GetListFields();
        }

        return fieldsResult.value.map(
                    fieldInfoResult => <IFieldInfo> {
                        InternalName: fieldInfoResult.InternalName,
                        Title: fieldInfoResult.Title,
                        Id: fieldInfoResult.Id,
                        Hidden: fieldInfoResult.Hidden,
                        Type: fieldInfoResult.TypeAsString
                    }
                );
    }

    public async GetFieldInfo(): Promise<IFieldInfo[]> {
        return await this.GetCachedFieldInfo();
    }

    public async GetVisibleEditableFieldInfo(): Promise<IFieldInfo[]> {
        const nonEditableFields = ["ContentType", "FileLeafRef", "Modified_x0020_By", "Created_x0020_By"];

        let fieldInfo = await this.GetCachedFieldInfo();

        return fieldInfo
            .filter(fieldInfoResult => !fieldInfoResult.Hidden) // exclude fields which are not even visible in the form
            .filter(fieldInfoResult => nonEditableFields.indexOf(fieldInfoResult.InternalName) === -1) // exclude fields that are not editable through form UI
            ;
    }
} 