import { ISPRestAPI } from "./ISPRestAPI";
import { injectable, inject } from "inversify";
import { IPageContextInformation, IPageContextExtractor } from "../PageContextInformation/IPageContextInformation";

// this is a proxy class for some of the SharePoint's REST API methods
@injectable()
export class SPRestAPI implements ISPRestAPI {
    private _pageContextInformation: IPageContextInformation;

    public constructor(@inject("IPageContextExtractor") private _pageContextInformationGatherer: IPageContextExtractor) {
        this._pageContextInformation = this._pageContextInformationGatherer.GetPageContextInformation();
    }

    private async ReturnGenericGetQueryResult(query: string): Promise<any> {
        const queryResult: any = await $.ajax({
            url: query,
            async: false,
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            type: "GET",
        });

        return queryResult;
    }

    public GetList(): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + "/_api/web/lists('" + this._pageContextInformation.ListId + "')";
        return this.ReturnGenericGetQueryResult(query);
    }

    public GetListFields(): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + "/_api/web/lists('" + this._pageContextInformation.ListId + "')/fields";
        return this.ReturnGenericGetQueryResult(query);
    }

    public GetListContentTypeFields(contentTypeId: string): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/lists('${this._pageContextInformation.ListId}')/ContentTypes('${contentTypeId}')/Fields`;
        return this.ReturnGenericGetQueryResult(query);
    }

    public GetSiteUsers(): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/siteusers`;
        return this.ReturnGenericGetQueryResult(query);
    }

    public GetGroupUsers(groupId: number): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/sitegroups(${groupId})/users`;
        return this.ReturnGenericGetQueryResult(query);
    }

    public GetFolderContentTypeOrder(folderServerRelativeUrl?: string): Promise<any> {
        // below is a query to get the content type order from root folder
        let query: string =  this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/lists('${this._pageContextInformation.ListId}')/rootfolder/ContentTypeOrder`;
        if (folderServerRelativeUrl) {
            // if, however, folder URL is specified, then we need to use a different query to get the content type order from that folder
            query = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/GetFolderByServerRelativeUrl('${folderServerRelativeUrl}')/ContentTypeOrder`;
        }
        return this.ReturnGenericGetQueryResult(query);
    }

    public GetFolderUniqueContentTypeOrder(folderServerRelativeUrl?: string): Promise<any> {
        // below is a query to get the unique content type order from root folder
        let query: string =  this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/lists('${this._pageContextInformation.ListId}')/rootfolder/UniqueContentTypeOrder`;
        if (folderServerRelativeUrl) {
            // if, however, folder URL is specified, then we need to use a different query to get the unique content type order from that folder
            query = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/GetFolderByServerRelativeUrl('${folderServerRelativeUrl}')/UniqueContentTypeOrder`;
        }
        return this.ReturnGenericGetQueryResult(query);
    }
}