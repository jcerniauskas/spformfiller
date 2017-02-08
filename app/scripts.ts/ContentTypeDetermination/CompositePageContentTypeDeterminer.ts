import { IContentTypeDeterminer, IContentTypeInformation } from "./IContentTypeInfo";
import { injectable, inject } from "inversify";
import PageContentTypeDeterminerByField from "./PageContentTypeDeterminerByField";
import { IListInfoService } from "../Services/ListInfo/IListInfoService";
import { IPageContextExtractor } from "../PageContextInformation/IPageContextInformation";

@injectable()
export default class CompositePageContentTypeDeterminer implements IContentTypeDeterminer {
    private _pageContentTypeDeterminerByField = new PageContentTypeDeterminerByField();

    public constructor (
        @inject("IListInfoService") private _listInfoService: IListInfoService,
        @inject("IPageContextExtractor") private _pageContextExtractor: IPageContextExtractor) { }

    public async GetContentTypeInformation(): Promise<IContentTypeInformation> {
        const listQueryResult = await this._listInfoService.GetList();
        if (!listQueryResult.ContentTypesEnabled) {
            // if content types are not enabled then we shouldn't return any content type informatino
            return null;
        }

        // first try to get the content type using the PageContentTypeDeterminerByField
        const contentTypeInformationFromField = await this._pageContentTypeDeterminerByField.GetContentTypeInformation();
        if (contentTypeInformationFromField) {
            return contentTypeInformationFromField;
        } else {
            // if we don't get it from the field then we need to do more complex checking

            // first try checking if the current folder has UniqueContentTypeOrder set
            const pageContextInfo = this._pageContextExtractor.GetPageContextInformation();
            let contentTypeOrder = await this._listInfoService.GetFolderUniqueContentTypeOrder(pageContextInfo.FolderUrl);
            if (!contentTypeOrder) {
                // if it doesn't have a unique content type order set then try the normal content type order
                contentTypeOrder = await this._listInfoService.GetFolderContentTypeOrder(pageContextInfo.FolderUrl);
            }

            // if it only has one unique content type order then return that one
            if (contentTypeOrder && contentTypeOrder.ContentTypeIds && contentTypeOrder.ContentTypeIds.length === 1) {
                return <IContentTypeInformation> {
                    ContentTypeId: contentTypeOrder.ContentTypeIds[0],
                };
            }

            // if we have more than one content type in the order then try using ContentTypeId from the query string
            return <IContentTypeInformation> {
                ContentTypeId: pageContextInfo.ContentTypeId,
            };
        }
    }
}