import { IFieldInfo, IFieldInfoGatherer } from "./IFieldInfo";
import { injectable, inject } from "inversify";
import { ISPRestAPI } from "../SPRestAPI/ISPRestAPI";
import { IContentTypeDeterminer, IContentTypeInformation } from "../ContentTypeDetermination/IContentTypeInfo";

// this component gets the field information for the form and should be able to return the information about fields which need to be filled in
@injectable()
export default class ListFieldInfoRestQuery implements IFieldInfoGatherer {
    public constructor(@inject("ISPRestAPI") private _spRestAPI: ISPRestAPI, @inject("IContentTypeDeterminer") private _contentTypeDeterminer: IContentTypeDeterminer) {
    }

    // we will use a promise to cache field info
    private _cachedFieldInfo: Promise<IFieldInfo[]>;
    private async GetCachedFieldInfo(): Promise<IFieldInfo[]> {
        if (this._cachedFieldInfo === undefined) {
            this._cachedFieldInfo = this.LoadFields();
        }

        return this._cachedFieldInfo;
    }
    private async LoadFields(): Promise<IFieldInfo[]> {
        // first we need to check if the list has content types enabled
        const listQueryResult = await this._spRestAPI.GetList();
        let fieldsResult: any = undefined;
        if (listQueryResult.ContentTypesEnabled) {
            // if it has - we need to get the fields that that the current content type has
            const contentTypeInformation = await this._contentTypeDeterminer.GetContentTypeInformation();
            fieldsResult = await this._spRestAPI.GetListContentTypeFields(contentTypeInformation.ContentTypeId);
        } else {
            // if content types are not enabled - we should get the fields for the list itself
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

    public GetFieldInfo(): Promise<IFieldInfo[]> {
        return this.GetCachedFieldInfo();
    }

    public async GetVisibleEditableFieldInfo(): Promise<IFieldInfo[]> {
        // we don't want to inlude these fields because they are not actually editable
        const nonEditableFields = ["ContentType", "FileLeafRef", "Modified_x0020_By", "Created_x0020_By"];

        const fieldInfo = await this.GetCachedFieldInfo();

        return fieldInfo
            .filter(fieldInfoResult => !fieldInfoResult.Hidden) // exclude fields which are not even visible in the form
            .filter(fieldInfoResult => nonEditableFields.indexOf(fieldInfoResult.InternalName) === -1) // exclude fields that are not editable through form UI
            ;
    }
} 