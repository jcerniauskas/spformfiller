import { ISPRestAPI } from "./ISPRestAPI";
import { injectable, inject } from "inversify";
import { IPageContextInformation, IPageContextExtractor } from "../PageContextInformation/IPageContextInformation";

// this is a proxy class for some of the SharePoint's REST API methods
@injectable()
export default class SPRestAPI implements ISPRestAPI {
    private _pageContextInformation: IPageContextInformation;

    public constructor(@inject("IPageContextExtractor") private _pageContextInformationGatherer: IPageContextExtractor) {
        this._pageContextInformation = this._pageContextInformationGatherer.GetPageContextInformation();
    }

    private async ReturnGenericGetQueryResult(query: string): Promise<any> {
        const queryResult: any = await $.ajax({
            url: query,
            async: false,
            headers: {
                "Accept": "application/json;odata=nometadata",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            type: "GET",
        });

        return queryResult;
    }

    public async GetList(): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + "/_api/web/lists('" + this._pageContextInformation.ListId + "')";
        const queryResult: any = await this.ReturnGenericGetQueryResult(query);

        return queryResult;
    }

    public async GetListFields(): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + "/_api/web/lists('" + this._pageContextInformation.ListId + "')/fields";
        const queryResult: any = await this.ReturnGenericGetQueryResult(query);

        return queryResult;
    }

    public async GetListContentTypeFields(contentTypeId: string): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/lists('${this._pageContextInformation.ListId}')/ContentTypes('${contentTypeId}')/Fields`;
        const queryResult: any = await this.ReturnGenericGetQueryResult(query);

        return queryResult;
    }

    public async GetSiteUsers(): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/siteusers`;
        const queryResult: any = await this.ReturnGenericGetQueryResult(query);

        return queryResult;
    }

    public async GetGroupUsers(groupId: number): Promise<any> {
        const query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, "") + `/_api/web/sitegroups(${groupId})/users`;
        const queryResult: any = await this.ReturnGenericGetQueryResult(query);

        return queryResult;
    }
}