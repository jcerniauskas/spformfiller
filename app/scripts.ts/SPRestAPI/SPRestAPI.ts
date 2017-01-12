import { ISPRestAPI } from "./ISPRestAPI";
import { injectable, inject } from "inversify";
import { IPageContextInformation, IPageContextExtractor } from "../PageContextInformation/IPageContextInformation";

@injectable()
export default class SPRestAPI implements ISPRestAPI {
    private _pageContextInformationGatherer: IPageContextExtractor;
    private _pageContextInformation: IPageContextInformation;

    public constructor(@inject("IPageContextExtractor") pageContextExtractor: IPageContextExtractor) {
        this._pageContextInformationGatherer = pageContextExtractor;
        this._pageContextInformation = this._pageContextInformationGatherer.GetPageContextInformation();
    }

    private async ReturnGenericGetQueryResult(query: string) {
        let queryResult: any = await $.ajax({
            url: query,
            async: false,
            headers: { 'Accept': 'application/json;odata=nometadata' },
            type: 'GET',
        });

        return queryResult;
    }

    public async GetList(): Promise<any> {
        let query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, '') + "/_api/web/lists('" + this._pageContextInformation.ListId + "')";
        let queryResult: any = await this.ReturnGenericGetQueryResult(query);

        return queryResult;
    }

    public async GetListFields(): Promise<any> {
        let query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, '') + "/_api/web/lists('" + this._pageContextInformation.ListId + "')/fields";
        let queryResult: any = await this.ReturnGenericGetQueryResult(query);

        return queryResult;
    }

    public async GetListContentTypeFields(contentTypeId: string): Promise<any> {
        let query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, '') + `/_api/web/lists('${this._pageContextInformation.ListId}')/ContentTypes('${contentTypeId}')/Fields`;
        let queryResult: any = await this.ReturnGenericGetQueryResult(query);

        return queryResult;
    }
}