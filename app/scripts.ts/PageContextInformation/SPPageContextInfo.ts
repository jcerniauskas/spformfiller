import { IPageContextInformation, IPageContextExtractor } from "./IPageContextInformation";
import { injectable } from "inversify";

// this class gets page context information from _spPageContextInfo global page variable
@injectable()
export default class SPPageContextInfo implements IPageContextExtractor {
    public GetPageContextInformation(): IPageContextInformation {
        return <IPageContextInformation> {
            WebServerRelativeUrl: _spPageContextInfo.webServerRelativeUrl,
            ListId: _spPageContextInfo.pageListId
        };
    }
}