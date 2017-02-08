import { IFieldInfo, IFieldInfoGatherer } from "./IFieldInfo";
import { injectable, inject } from "inversify";
import { IListInfoService } from "../Services/ListInfo/IListInfoService";
import { IContentTypeDeterminer, IContentTypeInformation } from "../ContentTypeDetermination/IContentTypeInfo";

// this component gets the field information for the form and should be able to return the information about fields which need to be filled in
@injectable()
export default class ListFieldInfoRestQuery implements IFieldInfoGatherer {
    public constructor(@inject("IListInfoService") private _listInfoService: IListInfoService, @inject("IContentTypeDeterminer") private _contentTypeDeterminer: IContentTypeDeterminer) {
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
        // first we need to check if we should get the fields for the list or for a specific content type
        const contentTypeInformation = await this._contentTypeDeterminer.GetContentTypeInformation();

        let fieldsResult: IFieldInfo[] = undefined;
        if (contentTypeInformation && contentTypeInformation.ContentTypeId) {
            // if it has - we need to get the fields that that the current content type has
            fieldsResult = await this._listInfoService.GetListContentTypeFields(contentTypeInformation.ContentTypeId);
        } else {
            // if content types are not enabled - we should get the fields for the list itself
            fieldsResult = await this._listInfoService.GetListFields();
        }

        return fieldsResult;
    }

    public GetFieldInfo(): Promise<IFieldInfo[]> {
        return this.GetCachedFieldInfo();
    }

    public async GetVisibleEditableFieldInfo(): Promise<IFieldInfo[]> {
        // we don't want to inlude these fields because they are not actually editable
        const nonEditableFields = ["ContentType", "FileLeafRef", "Modified_x0020_By", "Created_x0020_By", "_CopySource", "_UIVersionString"];

        const fieldInfo = await this.GetCachedFieldInfo();

        return fieldInfo
            .filter(fieldInfoResult => !fieldInfoResult.Hidden) // exclude fields which are not even visible in the form
            .filter(fieldInfoResult => !fieldInfoResult.ReadOnlyField) // exclude read only fields
            .filter(fieldInfoResult => nonEditableFields.indexOf(fieldInfoResult.InternalName) === -1) // exclude fields that are not editable through form UI
            ;
    }
} 