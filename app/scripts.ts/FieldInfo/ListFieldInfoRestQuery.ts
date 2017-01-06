import { IFieldInfo, IFieldInfoGatherer } from "./IFieldInfo";
import { injectable, inject } from "inversify";
import { IPageContextInformation, IPageContextExtractor } from "../PageContextInformation/IPageContextInformation";

@injectable()
export default class ListFieldInfoRestQuery implements IFieldInfoGatherer {
    private _pageContextInformationGatherer: IPageContextExtractor;
    private _pageContextInformation: IPageContextInformation;

    public constructor(@inject("IPageContextExtractor") pageContextExtractor: IPageContextExtractor) {
        this._pageContextInformationGatherer = pageContextExtractor;
        this._pageContextInformation = this._pageContextInformationGatherer.GetPageContextInformation();
    }

    public async GetFieldInfos(): Promise<IFieldInfo[]> {
        let query: string = this._pageContextInformation.WebServerRelativeUrl.replace(/\/$/, '') + "/_api/web/lists('" + this._pageContextInformation.ListId + "')/fields";
        let queryResult: any = await $.ajax({
            url: query,
            async: false,
            headers: { 'Accept': 'application/json;odata=verbose' },
            type: 'GET',
        });

        return queryResult.map(fieldInfoResult => <IFieldInfo> { Id: fieldInfoResult.Id });
    }
} 