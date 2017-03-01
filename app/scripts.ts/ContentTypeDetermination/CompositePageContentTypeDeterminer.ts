import { IContentTypeDeterminer, IContentTypeInformation } from "./IContentTypeInfo";
import { injectable, inject } from "inversify";
import { PageContentTypeDeterminerByField } from "./PageContentTypeDeterminerByField";
import { IListInfoService } from "../Services/ListInfo/IListInfoService";
import { IPageContextExtractor } from "../PageContextInformation/IPageContextInformation";

// this IContentTypeDeterminer will try to determine current content type using more complex logic - it will first try to use PageContentTypeDeterminerByField,
// but if the field is not present then it will use SharePoint's List service and at last it will fall back to checking the ContentTypeId from query string
@injectable()
export class CompositePageContentTypeDeterminer implements IContentTypeDeterminer {
    private _pageContentTypeDeterminerByField = new PageContentTypeDeterminerByField();

    public constructor (
        @inject("IListInfoService") private _listInfoService: IListInfoService,
        @inject("IPageContextExtractor") private _pageContextExtractor: IPageContextExtractor) { }

    public async GetContentTypeInformation(): Promise<IContentTypeInformation> {
        const listQueryResult = await this._listInfoService.GetList();
        if (!listQueryResult.ContentTypesEnabled) {
            // if content types are not enabled then we shouldn't return any content type information
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
            const folderUrl = pageContextInfo.FolderUrl;    // this might be null, but listInfoService will then query the root folder
            let contentTypeOrder = await this._listInfoService.GetFolderUniqueContentTypeOrder(folderUrl);
            if (!contentTypeOrder) {
                // if it doesn't have a unique content type order set then try the normal content type order
                contentTypeOrder = await this._listInfoService.GetFolderContentTypeOrder(folderUrl);
            }

            // if it only has one unique content type order then return that one
            if (contentTypeOrder && contentTypeOrder.ContentTypeIds && contentTypeOrder.ContentTypeIds.length === 1) {
                return <IContentTypeInformation> {
                    ContentTypeId: contentTypeOrder.ContentTypeIds[0],
                };
            }

            // if we have more than one content type in the order then try using ContentTypeId from the query string, if it is specified
            if (pageContextInfo.ContentTypeId) {
                return <IContentTypeInformation> {
                    ContentTypeId: pageContextInfo.ContentTypeId,
                };
            }

            // lastly try taking the first (default) content type if we got any from the content type order
            if (contentTypeOrder && contentTypeOrder.ContentTypeIds && contentTypeOrder.ContentTypeIds.length > 1) {
                return <IContentTypeInformation> {
                    ContentTypeId: contentTypeOrder.ContentTypeIds[0],
                };
            }
        }
    }
}