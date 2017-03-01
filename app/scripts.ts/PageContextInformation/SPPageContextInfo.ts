import { IPageContextInformation, IPageContextExtractor } from "./IPageContextInformation";
import { injectable } from "inversify";
import * as queryString from "query-string";

// this class gets page context information from _spPageContextInfo global page variable
@injectable()
export class SPPageContextInfo implements IPageContextExtractor {
    public GetPageContextInformation(): IPageContextInformation {
        return <IPageContextInformation> {
            WebServerRelativeUrl: _spPageContextInfo.webServerRelativeUrl,
            ListId: _spPageContextInfo.pageListId,
            FolderUrl: <string>SPPageContextInfo.GetQueryStringParam("RootFolder"),
            ContentTypeId: <string>SPPageContextInfo.GetQueryStringParam("ContentTypeId")
        };
    }

    private static GetQueryStringParam(key: string): string | string[] {
        return queryString.parse(location.search)[key];
    }
}