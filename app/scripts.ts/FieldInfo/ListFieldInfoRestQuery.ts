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
            let listQueryResult = await this._spRestAPI.GetList();
            let fieldsResult: any = undefined;
            if (listQueryResult.ContentTypesEnabled) {
                let contentTypeInformation = this._contentTypeDeterminer.GetContentTypeInformation();

            } else {
                fieldsResult = await this._spRestAPI.GetListFields();
            }

            this._cachedFieldInfo = fieldsResult.value.map(
                        fieldInfoResult => <IFieldInfo> {
                            InternalName: fieldInfoResult.InternalName,
                            Title: fieldInfoResult.Title,
                            Id: fieldInfoResult.Id,
                            Hidden: fieldInfoResult.Hidden
                        }
                    );
        }

        return this._cachedFieldInfo;
    }

    public async GetFieldInfo(): Promise<IFieldInfo[]> {
        return await this.GetCachedFieldInfo();
    }

    public async GetVisibleFieldInfo(): Promise<IFieldInfo[]> {
        let fieldInfo = await this.GetCachedFieldInfo();

        return fieldInfo
            .filter(fieldInfoResult => !fieldInfoResult.Hidden);
    }
} 