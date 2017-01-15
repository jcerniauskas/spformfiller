import { IPageContextInformation, IPageContextExtractor } from "./IPageContextInformation";
import { injectable } from "inversify";
import WindowVariables from "./WindowVariables";

@injectable()
export default class SPPageContextInfo implements IPageContextExtractor {
    public GetPageContextInformation(): IPageContextInformation {
        //let windowVariables = WindowVariables.RetrieveWindowVariables(["_spPageContextInfo"]);
        let windowVariables = { _spPageContextInfo: _spPageContextInfo };

        return <IPageContextInformation> {
            WebServerRelativeUrl: windowVariables._spPageContextInfo.webServerRelativeUrl,
            ListId: windowVariables._spPageContextInfo.pageListId
        };
    }
}